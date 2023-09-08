import LinkButton from "../layout/LinkButton";
import savings from "../../img/savings.svg";
import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles.main}>
      <h1>
        Bem vindo ao <span>Costs 2.0</span>
      </h1>
      <p>Upgrade do Costs, idealizado por Matheus Battisti</p>
      <LinkButton to="/NewProject" text="Criar Projeto" />
      <img src={savings} alt="Imagem da Logo" />
    </section>
  );
}
export default Home;
