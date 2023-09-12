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
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [serviceMessage, setServiceMessage] = useState("");
  const nothing = '--'

  const location = useLocation();
  let message = "";
  if (location.state) {message = location.state.message};

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        await fetch("http://localhost:5000/services", {method: "GET",headers: {"Content-Type": "application/json"}})
          .then((resp) => resp.json())
          .then((data) => {setServices(data);setRemoveLoading(true)})
          .then(await fetch("http://localhost:5000/projects", {method: "GET",headers: {"Content-Type": "application/json"}})
          .then((resp) => resp.json())
          .then((data) => setProjects(data)))
          .catch((err) => console.log(err));
      }; fetchData()
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
  
  const projectOwner = (id) => {
    return projects.filter((project) => project?.id === parseInt(id)).map((project) => project?.name).reduce((acc,val) => acc + val, '')
  }
  
  return (<>
    {!removeLoading && <Loading/>}
    {removeLoading === true && <>
      {services.length > 1 ? (<>
          <div className={styles.title}>
            <h1>Meus Serviços</h1>
            <LinkButton to="/newservice" text="Criar Serviço" />
          </div>
          {message && <Message type="succsess" msg={message}/>}
          {serviceMessage && <Message type="succsess" msg={serviceMessage} />}
          <Container>
            <div className={styles.serviceCard}>
              {services.length > 1 && services.filter((service) => service.id > 0).map((service) => (
                <ServiceCard
                  owner={service.OwnerID ? (projectOwner(service.OwnerID?.id)) : nothing}
                  id={service.id}
                  key={service.id}
                  name={service.name}
                  cost={service.cost > 0 ? (format(service.cost)) : nothing}
                  description={service.description ? (service.description) : nothing}
                  url={service.url || nothing}
                  handleRemove={removeService}/>
                ))}
            </div>
          </Container>
        </>) : (<>
        <div className={styles.service}>
          <div className={styles.title}>
            <h1>Meus Serviços</h1>
            <LinkButton to="/newservice" text="Criar serviço" />
          </div>
        <NoData dataType={'serviços'}/>
        </div>
      </>)}
    </>}
  </>);
}

export default Services;
