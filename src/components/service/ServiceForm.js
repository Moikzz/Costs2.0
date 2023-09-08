import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "../project/ProjectForm.module.css";

import { useState, useEffect } from "react";

function ServiceForm({ handleSubmit, btnText, serviceData }) {
  const [service, setService] = useState(serviceData || {})
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {"Content-Type": "application/json"}})
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.log(err))
  }, []);

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(service)
  }
  function handleChange(e) {
    setService({ 
      ...service, 
      [e.target.name]: e.target.value });
  }
  function handleProject(e) {
    setService({
      ...service,
      OwnerID: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }})
    }
    
  return (
    <form onSubmit={submit} className={styles.form}>
      <Select
        name="owner"
        text="Projeto pertencente"
        options={projects}
        handleOnChange={handleProject}
        value={service.OwnerID ? service.OwnerID.id : ""}
      />
      <Input
        name="name"
        type="text"
        text="Nome do Serviço"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />
      <Input
        name="cost"
        type="number"
        text="Custo do Serviço"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />
      <Input
        name="description"
        type="text"
        text="Descrição do Serviço"
        placeholder="Descreva do serviço"
        handleOnChange={handleChange}
      />
      <Input
        name="url"
        type="text"
        text="URL do Serviço"
        placeholder="Exemplo: http://exemplo.com/item000001"
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
