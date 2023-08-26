import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import NoData from '../layout/NoData';
import Message from "../layout/Message";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ServiceCard from "../service/ServiceCard";

import styles from "./Services.module.css";

function Services() {
  const [services, setServices] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [serviceMessage, setServiceMessage] = useState("");
  const nothing = '--'

  const location = useLocation();
  let message = "";
  if (location.state) {message = location.state.message};

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/services", {
        method: "GET",
        headers: {"Content-Type": "application/json"}})
        .then((resp) => resp.json())
        .then((data) => {
          setServices(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 400);
  }, []);

  function removeService(id) {
    fetch(`http://localhost:5000/services/${id}`, {
      method: "DELETE",
      headers: {"Content-type": "application/json"}})
      .then((resp) => resp.json())
      .then(() => {
        setServices(services.filter((service) => service.id !== id))
        setServiceMessage("Serviço Removido!")})
      .catch((err) => console.log(err))
  }

  function format (number) {
    return parseInt(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  }
  
  return (<>
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Serviços</h1>
        <LinkButton to="/newservice" text="Criar Serviço" />
      </div>
      {message && <Message type="succsess" msg={message}/>}
      {serviceMessage && <Message type="succsess" msg={serviceMessage} />}
      <Container customClass="start">
        <div className={styles.projectCard}>
          {services.length > 0 &&
            services.map((service) => (
              <ServiceCard
                showOwner={true}
                owner={service.OwnerID?.name ? (service.OwnerID?.name) : nothing}
                id={service.id}
                key={service.id}
                name={service.name}
                cost={service.cost ? (format(service.cost)) : nothing}
                description={service.description ? (service.description) : nothing}
                url={service.url || nothing}
                handleRemove={removeService}
              />
            ))}
        </div>
        {removeLoading && services.length === 0 && <NoData dataType={'serviços'}/>}
        {!removeLoading && <Loading />}
      </Container>
    </div>
  </>);
}

export default Services;
