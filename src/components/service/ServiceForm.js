import { useState, useEffect } from "react";

import Input from "../form/Input";
// import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

import Styles from "../project/ProjectForm.module.css";

function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState([]);
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.log(err));
  }, []);

  const projectName = projects.map((project) => project.name)
  console.log(projectName);

  function submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }
    
  // function handleProject(e) {
  //   setProjects({
  //     ...projects,
  //     category: {
  //       id: e.target.value,
  //       name: e.target.options[e.target.selectedIndex].text,
  //     },
  //   });
  // }

  return (
    <form onSubmit={submit} className={Styles.form}>
      <Input
        type="text"
        text="Nome do Serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Custo do Serviço"
        name="cost"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do Serviço"
        name="description"
        placeholder="Descreva do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="URL do Serviço"
        name="url"
        placeholder="Exemplo: http://exemplo.com/item000001"
        handleOnChange={handleChange}
      />
      
      {/* <Select
        name="project_id"
        text="Projeto pertencente"
        options={projects}
        handleOnChange={handleProject}
        value={projects ? projects.id : ""}
      /> */}

      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
