import { BsFillTrashFill } from "react-icons/bs";
import Styles from "./ProjectCard.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProjectCard({ id, name, budget, cost, category, handleRemove, servicesOwned }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <Card id="card">
      <Card.Body>
        <Card.Title id="card-title">{name}</Card.Title>
        <Card.Subtitle className={Styles.category_text} id={Styles.category}>
          <span className={`${Styles[category.toLowerCase()]}`}></span>{category.toUpperCase()}
        </Card.Subtitle>
        <div className="content">
          <Card.Text><span>Nº de Serviços: </span>{servicesOwned}</Card.Text>
          <Card.Text><span>Orçamento: </span>{budget}</Card.Text>
          <Card.Text><span>Utilizado: </span>{cost}</Card.Text>
        </div>
        <div className="button">
          <Button className="custom-button" href={`/project/${id}`}>Visualizar</Button>
          <Button className="custom-button" onClick={remove}><BsFillTrashFill /> Excluir </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
export default ProjectCard;
