import { useNavigate } from "react-router-dom";
import ServiceForm from "./../service/ServiceForm";
import styles from "./NewProject.module.css";

function NewService() {
  const redirect = useNavigate();

  function createService(service) {
    fetch("http://localhost:5000/services", {
      method: "POST",
      headers: {"content-type": "application/json",},
      body: JSON.stringify(service)})
      .then((resp) => resp.json())
      .then(() => {redirect("/services", { state: { message: "Serviço Criado!" } })})
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.newProject_container}>
      <h1>Criar Serviço</h1>
      <p>Crie um serviço para depois adicionar a um projeto</p>
      <ServiceForm handleSubmit={createService} btnText="Criar Serviço" />
    </div>
  );
}
export default NewService;