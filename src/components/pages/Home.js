import LinkButton from "../layout/LinkButton";
import savings from "../../img/savings.svg";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container id="home-page">
      <h1>Bem vindo ao <span>Costs 2.0</span></h1>
      <p>Upgrade do Costs, idealizado por Matheus Battisti</p>
      <LinkButton to="/NewProject" text="Criar Projeto" />
      <img src={savings} alt="Imagem da Logo" />
    </Container>
  );
}
export default Home;
