import Input from "../form/Input";
import Select from "../form/Select";
import styles from "./ProjectForm.module.css";
import SubmitButton from "../form/SubmitButton";

import { useEffect, useState } from "react";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [project, setProject] = useState(projectData || {})
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {"Content-Type": "application/json"}})
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err))
  }, []);

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
  }
  function handleChange(e) {
    setProject({ 
      ...project, 
      [e.target.name]: e.target.value });
  }
  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }})}

  return (
    <form onSubmit={submit} className={styles.form}>
      <Select
        name="category"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ""}
      />
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do Projeto"
        handleOnChange={handleChange}
        value={project.name ? project.name : ""}
      />
      <Input
        type="number"
        text="Orçamento do Projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ""}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}
export default ProjectForm;