import { useNavigate } from "react-router-dom";
import ProjectForm from "./../project/ProjectForm";
import styles from "./NewProject.module.css";

function NewProject() {
  const redirect = useNavigate();

  function createProject(project) {
    project.cost = 0;

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(project)
    })
      .then((resp) => resp.json())
      .then(() => {redirect("/projects", { state: { message: "Projeto Criado!" } })})
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.newProject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie um projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createProject} btnText="Criar Projeto" />
    </div>
  );
}
export default NewProject;