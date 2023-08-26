import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Styles from "./Project.module.css";
import Loading from "./../layout/Loading";
import Message from "./../layout/Message";
import Container from "../layout/Container";
import ServiceForm from "./../service/ServiceForm";

function Service() {
  const { id } = useParams();
  const [type, setType] = useState();
  const [message, setMessage] = useState();
  const [service, setService] = useState();
  const [project, setProject] = useState();
  const [budgets, setBudgets] = useState();
  const [showServiceForm, setShowServiceForm] = useState(false);

  const formatedCurrency = (currency) => currency?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  const ProjectOwnerName = project?.filter((resp) => JSON.stringify(resp?.id) === service?.OwnerID.id)
  const projectTarget = project?.filter((project) => project.id === parseInt(service?.OwnerID.id))[0]
  const projectBudget = budgets?.map((budget) => parseInt(budget?.cost)).reduce((acc, val) => acc + val, 0)
  const servicesTotalBudget = parseInt(projectTarget?.budget)
  const nothing = '--'

  // Dados do Serviço e Projeto relacionado ao Serviço
  useEffect(() => {
    setTimeout(() => {
      let fetchData = async() => {
        await fetch(`http://localhost:5000/services/${id}`, 
          {method: "GET",headers: {"content-type": "application/json"}})
        .then((resp) => resp.json())
        .then((data) => {setService(data)})
        .then(await fetch(`http://localhost:5000/projects`, 
          {method: "GET",headers: {"Content-Type" : "application/json"}})
        .then((resp) => resp.json())
        .then((data) => {setProject(data)}))
        .catch((err) => console.log(err))}
      fetchData()
    }, 400)}, [id])

  // Dados dos demais Serviços do Projeto relacionado ao Serviço
  useEffect(() => {
    let fetchBudget = async () => {
      await fetch(`http://localhost:5000/services?OwnerID.id=${projectTarget?.id}`, 
        {method: "GET",headers: {"content-type": "application/json"}})
      .then((resp) => resp.json())
      .then((data) => {setBudgets(data)})
      .catch((err) => console.log(err))}
    fetchBudget()
  },[projectTarget])

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  // Consertar o erro onde eu consigo atualizar um serviço com um orçamento ENQUANTO o projeto não tem orçamento
  function editService(service) {
    setMessage("");
    if (projectBudget < servicesTotalBudget) {
      setMessage("O custo total dos serviços está maior que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/services/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(service)})
      .then((resp) => resp.json())
      .then((data) => {
        setService(data);
        setShowServiceForm(false);
        setMessage("Serviço Atualizado");
        setType("succsess");})
      .catch((err) => console.log(err))
  }

  return (
    <>
      {service?.name? (
        <div className={Styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={Styles.details_container}>
              <h1>Serviço: {service?.name}</h1>
              <button className={Styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Editar Serviço" : "Fechar"}
              </button>
              {!showServiceForm ? (
                <div className={Styles.project_info}>
                  <p><span> Projeto Pertecente: </span>{ProjectOwnerName?.lenght > 0 ? (ProjectOwnerName?.map((Owner) => Owner?.name)) : nothing}</p>
                  <p><span> Descrição: </span>{service?.description ? (service?.description) : nothing}</p>
                  <p><span> Custo: </span>{service?.cost ? (`R$ ${formatedCurrency(parseInt(service?.cost))}`) : nothing}</p>
                  <p><span> URL: </span>{service?.url ? (service?.url) : nothing}</p>
                </div>
              ) : ((
                <div className={Styles.project_info}>
                  <ServiceForm
                    handleSubmit={editService}
                    btnText="Concluir Edição"
                    projectData={service}
                  />
                </div>
              ))}
            </div>
          </Container>
        </div>
      ) : (
        <Loading/>
      )}
    </>
  );
}
export default Service;