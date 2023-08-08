// import { v4 as uuidv4 } from "uuid";
import Styles from "./Project.module.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Loading from "./../layout/Loading";
// import Message from "./../layout/Message";
import Container from "../layout/Container";
import ServiceForm from "./../service/ServiceForm";

function Service() {
  const { id } = useParams();
  const [showServiceForm, setShowServiceForm] = useState(false);
  // const [message, setMessage] = useState();
  // const [type, setType] = useState();
  
  // const formatedCurrency = (currency) => currency.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  // const formatedPercentage = (a, b) => `${Math.round((parseFloat(a)/parseFloat(b)) * 100)}%`

  useEffect(() => {
    // setTimeout(() => {
    //   fetch(`http://localhost:5000${url}/service/${service.id}}`, {
    //     method: "GET",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   })
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //       console.log(data);
    //       // setProject(data);
    //       // setServices(data.services);
    //     })
    //     .catch((err) => console.log(err));
    // }, 200);
  }, [id]);

    function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

    function editService(project) {
    // setMessage("");
    // if (project.budget < project.cost) {
    //   setMessage("O orçamento está maior que o custo total");
    //   setType("error");
    //   return false;
    // }

    // fetch(`http://localhost:5000/projects/${project.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(project),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setProject(data);
    //     setShowProjectForm(false);
    //     setMessage("Projeto Atualizado");
    //     setType("succsess");
    //   })
    //   .catch((err) => console.log(err));
  }


  
  return (
    <>
    <div className={Styles.project_details}>
      <Container customClass="column">
        <div className={Styles.details_container}>
          <h1>Serviço: {/* project.name */}</h1>
          <button className={Styles.btn} onClick={toggleServiceForm}>
            {!showServiceForm ? "Editar Serviço" : "Fechar"}
          </button>
          {!showServiceForm? (
            <div className={Styles.project_info}>
                <p><span> Categoria: </span> {/* project.category.name */}</p>
                <p><span> Total Disponível: </span> {/* `R$ ${formatedCurrency(project.budget)}` */}</p>
                <p><span> Total Utilizado: </span> {/* `R$ ${formatedCurrency(project.cost)} (${formatedPercentage(project.cost, project.budget)})` */}</p>
                <p><span> Total Restante: </span> {/* `R$ ${formatedCurrency(project.budget - project.cost)} (${formatedPercentage((project.budget - project.cost), project.budget)})` */}</p>
            </div>
          ) : (
            <div className={Styles.project_info}>
              <ServiceForm
                handleSubmit={editService}
                btnText="Concluir Edição"
                // projectData={project}
              />
            </div>
          ) || (
            <Loading />
          )}
        </div>
      </Container>
    </div>

    </>
  );
}
export default Service;
