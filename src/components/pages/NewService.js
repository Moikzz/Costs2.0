import { useNavigate } from "react-router-dom";
import ServiceForm from "./../service/ServiceForm";
import styles from "./NewProject.module.css";

function NewService() {
  const history = useNavigate();

  function createPost(project) {
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then(() => {history("/projects", { state: { message: "Projeto Criado!" } })})
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.newProject_container}>
      <h1>Criar Serviço</h1>
      <p>Crie um serviço para depois adicionar a um projeto</p>
      <ServiceForm handleSubmit={createPost} btnText="Criar Serviço" />
    </div>
  );
}
export default NewService;