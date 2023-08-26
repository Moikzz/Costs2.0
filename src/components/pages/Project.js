import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Styles from "./Project.module.css";
import Loading from "./../layout/Loading";
import Message from "./../layout/Message";
import Container from "./../layout/Container";
import LinkButton from "../layout/LinkButton";
import ServiceCard from "../service/ServiceCard";
import ProjectForm from "./../project/ProjectForm";

function Project() {
  const { id } = useParams();
  const [type, setType] = useState();
  const [message, setMessage] = useState();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  
  const formatedCurrency = (currency) =>currency.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  const formatedPercentage = (a, b) => `${Math.round((parseFloat(a) / parseFloat(b)) * 100)}%`;
  const serviceCostArray = services.map((service) => parseInt(service.cost)).reduce((acc, val) => acc + val, 0)
  const nothing = '--'

    useEffect(() => {
      setTimeout(() => {
        const fetchData = async () => {
          await fetch(`http://localhost:5000/projects/${id}`, 
            {method: "GET", headers: {"content-type" : "application/json"}})
            .then((resp) => resp.json())
            .then((data) => setProject(data))
            .then(await fetch(`http://localhost:5000/services?OwnerID.id=${id}`, 
              {method: "GET", headers: {"Content-Type" : "application/json"}})
              .then((resp) => resp.json())
              .then((data) => setServices(data)))
            .catch((err) => console.log(err))}
          fetchData()
      }, 400);
    }, [id]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function editProject(project) {
    setMessage("");
    if (project.budget < serviceCostArray) {setMessage("O orçamento está maior que o custo total"); setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, 
    {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(project)})
      .then((resp) => resp.json())
      .then((data) => {setProject(data); setShowProjectForm(false); setMessage("Projeto Atualizado"); setType("succsess");})
      .catch((err) => console.log(err));
  }

  function removeService(id) {
    fetch(`http://localhost:5000/services/${id}`, 
    {method: "DELETE", headers: {"Content-type": "application/json"}})
      .then((resp) => resp.json())
      .then(() => {setServices(services.filter((service) => service.id !== id)); setMessage("Serviço Removido!"); setType("succsess")})
      .catch((err) => console.log(err))
  }

  return (<>
    {project.name ? (
      <div className={Styles.project_details}>
        <Container customClass="column">
          {message && <Message type={type} msg={message} />}
          <div className={Styles.details_container}>
            <h1>Projeto: {project.name}</h1>
            <button className={Styles.btn} onClick={toggleProjectForm}>
              {!showProjectForm ? "Editar Projeto" : "Fechar"}
            </button>
            {!showProjectForm ? (
              <div className={Styles.project_info}>
                <p><span> Categoria: </span> {project.category.name ? (project.category.name): nothing}</p>
                <p><span> Total Disponível: </span>{" "}{project.budget ? (`R$ ${formatedCurrency(project.budget)},00`) : nothing}</p>
                <p><span> Total Utilizado: </span>{" "}{project.budget ? (`R$ ${formatedCurrency(serviceCostArray)},00 (${formatedPercentage(serviceCostArray, project.budget)})`) : nothing}</p>
                <p><span> Total Restante: </span>{" "}{project.budget ? (`R$ ${formatedCurrency(project.budget - serviceCostArray)},00 (${formatedPercentage(project.budget - serviceCostArray, project.budget)})`) : nothing}</p>
              </div>
              ) : (
                <div className={Styles.project_info}>
                  <ProjectForm
                    handleSubmit={editProject}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )
            }
          </div>
          <h2>Serviços</h2>
          <div className={Styles.services}>
            {services.length > 0 &&
              services.map((service) => (<>
                <ServiceCard
                  showOwner={false}
                  owner={service.OwnerID.name}
                  id={service.id}
                  key={service.id}
                  name={service.name}
                  cost={service.cost? (formatedCurrency(service.cost)) : nothing}
                  description={service.description || "--"}
                  url={service.url || "--"}
                  linkRoute={`http://localhost:3000/service/${service.id}`}
                  handleRemove={removeService}
                />
              </>))}
            {services.length === 0 && <p>Não há serviços cadastrados</p>}
          </div>
          <div className={Styles.service_form_container}>
            <h2>Adicione um Serviço</h2>
            <LinkButton to="/newservice" text="Criar Serviço" />
          </div>
        </Container>
      </div>
      ) : (<Loading />)
    }
  </>);
}
export default Project;
