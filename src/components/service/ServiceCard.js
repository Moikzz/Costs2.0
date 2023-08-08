import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import Styles from "../project/ProjectCard.module.css";

function ServiceCard({
  linkRoute,
  id,
  name,
  cost,
  description,
  url,
  handleRemove,
}) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id, cost);
  };

  return (
    <div className={Styles.project_card}>
      <h4>{name}</h4>
      <p><span>Custo Total: </span> R$ {cost}</p>
      <p><span>Descrição: </span>{description}</p>
      <p><span>URL: </span>{url}</p>
      <div className={Styles.project_card_actions}>
        <Link to={linkRoute}> Visualizar</Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
