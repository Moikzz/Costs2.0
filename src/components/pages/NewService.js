import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ServiceForm from "./../service/ServiceForm";
import styles from "./NewProject.module.css";
import Message from "./../layout/Message";

function NewService() {
  const redirect = useNavigate();
  const [projects, setProjects] = useState()
  const [services, setServices] = useState()
  const [type, setType] = useState();
  const [message, setMessage] = useState();

  const formatedCurrency = (currency) => currency?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")

  useEffect(() => {
    const fetchData = async() => {
      await fetch("http://localhost:5000/projects", {method: "GET", headers: {"Content-Type": "application/json"}})
      .then((resp) => resp.json())
      .then((data) => setProjects(data))
      .then(await fetch("http://localhost:5000/services", {method: "GET", headers: {"Content-Type": "application/json"}})
      .then((resp) => resp.json())
      .then((data) => setServices(data)))
      .catch((err) => console.log(err))
    }; fetchData()
  }, [])

  function createService(service) {

    const newServiceCost = service.cost

    const totalBudget = projects?.filter((project) => parseInt(project?.id) === parseInt(service?.OwnerID?.id)) // retorna só o projeto que vai virar Owner
      .map((project) => parseInt(project?.budget)) // retorna o orçamento dele
      .reduce((acc, val) => acc + val, 0) // transforma em um valor único 

    const servicesCostsOwnedByProject = services?.filter((thoseServices) => parseInt(thoseServices?.OwnerID?.id) === parseInt(service?.OwnerID?.id)) // retorna só os serviços que vão compartilhar o Owner
      .map((service) => parseInt(service.cost)) // retorna os custos desses serviços
      .reduce((acc, val) => acc + val, 0) // soma todo mundo em um valor único
  
    if (newServiceCost > (totalBudget - servicesCostsOwnedByProject)) {
      setMessage(`Orçamento Ultrapassado! Valor máximo disponível: R$${formatedCurrency(totalBudget - servicesCostsOwnedByProject)},00`);
      setType("error");
      return false;
    }

    fetch("http://localhost:5000/services", {
      method: "POST",
      headers: {"content-type": "application/json",},
      body: JSON.stringify(service)})
      .then((resp) => resp.json())
      .then(() => {redirect("/services", { state: { message: "Serviço Criado!" } })})
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.newProject_container}>
      {message && <Message type={type} msg={message} />}
      <h1>Criar Serviço</h1>
      <p>Crie um serviço para depois adicionar a um projeto</p>
      <ServiceForm handleSubmit={createService} btnText="Criar Serviço" />
    </div>
  );
}
export default NewService;