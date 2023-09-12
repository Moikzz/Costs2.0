import { BsFillTrashFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ServiceCard({owner, id, name, cost, description, url, handleRemove}) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <Card id="card">
      <Card.Body>
        <Card.Title id="card-title">{name}</Card.Title>
        <div className="content">
          <Card.Text><span>Pertencente: </span>{owner}</Card.Text>
          <Card.Text><span>Custo Total: </span>{cost}</Card.Text>
          <Card.Text><span>Descrição: </span>{description}</Card.Text>
          <Card.Text><span>URL: </span>{url}</Card.Text>
        </div>
        <div className="button">
          <Button className="custom-button" href={`/service/${id}`}> Visualizar</Button>
          <Button className="custom-button" onClick={remove}><BsFillTrashFill /> Excluir </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ServiceCard;
