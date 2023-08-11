import { useState, useEffect } from "react";

import NoData from './../layout/NoData';
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";

import styles from "./Projects.module.css";
import ServiceCard from "../service/ServiceCard";

// COLOCAR O UUID V4 PRA FAZER PARAR DE RECLAMAR SOBRE KEYS REPITIDAS
function Services() {
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [project, setProject] = useState([]); // tirar ele pra só deixar o serviço OU NÃO
  const [services, setServices] = useState([]);

  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setServices(data);
          console.log(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 40000);
  }, []);

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter((service) => service.id !== id); 
    const projectUpdated = project;
    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

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
        setShowServiceForm(showServiceForm);
      })
      .catch((err) => console.log(err));
  }


  // FAZER FUNÇÃO ASSINCRONA ENQUANTO OS DADOS NÃO CARREGAM. ENQUANTO ELES NÃO CARREGAM, DEIXA O COMPONENTE DE lOADING
  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Serviços</h1>
        <LinkButton to="/newservice" text="Criar Serviço" />
      </div>
      <Container customClass="start">
        {services.length > 0 &&
          services.map((service) =>
          <>
            <ServiceCard
              id={service.id}
              key={service.id}
              name={service.name}
              cost={service.cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
              description={service.description || "--"}
              url={service.url || "--"}
              handleRemove={removeService}
              // handleEdit={editService}
            />
          </>
          )}
        {services.length === 0 && <NoData dataType={'serviços'}/>}
        {!removeLoading && <Loading />}
      </Container>
    </div>
  );
}

export default Services;
