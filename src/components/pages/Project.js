import { v4 as uuidv4 } from "uuid";

import Styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "./../layout/Loading";
import Message from "./../layout/Message";
import Container from "./../layout/Container";
import ProjectForm from "./../project/ProjectForm";
import ServiceForm from "./../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function Project() {
  const { id } = useParams();
  const [type, setType] = useState();
  const [message, setMessage] = useState();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  
  const formatedCurrency = (currency) => currency.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  const formatedPercentage = (a, b) => `${Math.round((parseFloat(a)/parseFloat(b)) * 100)}%`

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 200);
  }, [id]);

  function createService(project) {
    const lastService = project.services[project.services.length - 1];
    const lastServiceCost = lastService.cost;
    const newCost = parseInt(project.cost, 10) + parseInt(lastServiceCost, 10);
    lastService.id = uuidv4();

    if (newCost > parseInt(project.budget, 10)) {
      setMessage("ORÇAMENTO ULTRAPASSADO");
      setType("error");
      project.services.pop();
      return false;
    }

    project.cost = newCost;
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then(() => {
        setShowServiceForm(false);
        setMessage("Serviço Criado!");
        setType("succsess");
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;
    projectUpdated.services = servicesUpdated;
    projectUpdated.cost =
      parseInt(projectUpdated.cost, 10) - parseInt(cost, 10);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then(() => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço Removido!");
        setType("succsess");
        setShowServiceForm(showServiceForm);
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function editPost(project) {
    setMessage("");
    if (project.budget < project.cost) {
      setMessage("O orçamento está maior que o custo total");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Projeto Atualizado");
        setType("succsess");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
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
                  <p><span> Categoria: </span> {project.category.name}</p>
                  <p><span> Total Disponível: </span> {`R$ ${formatedCurrency(project.budget)}`}</p>
                  <p><span> Total Utilizado: </span> {`R$ ${formatedCurrency(project.cost)} (${formatedPercentage(project.cost, project.budget)})`}</p>
                  <p><span> Total Restante: </span> {`R$ ${formatedCurrency(project.budget - project.cost)} (${formatedPercentage((project.budget - project.cost), project.budget)})`}</p>
                </div>
              ) : (
                <div className={Styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={Styles.service_form_container}>
              <h2>Adicione um Serviço</h2>
              <button className={Styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
              </button>
              <div className={Styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (<>
                  <ServiceCard
                    id={service.id}
                    key={service.id}
                    name={service.name}
                    cost={formatedCurrency(service.cost)}
                    description={service.description || "--"}
                    url={service.url || "--"}
                    handleRemove={removeService}
                    linkRoute={`http://localhost:3000/service/`} // ${service.id}
                  />
                  </>
                ))}
              {services.length === 0 && <p>Não há Serviços Cadastrados</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default Project;
