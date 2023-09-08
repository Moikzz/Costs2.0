import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import Styles from "./ProjectCard.module.css";

function ProjectCard({ id, name, budget, cost, category, handleRemove, servicesOwned }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className={Styles.project_card}>
      <h4>{name}</h4>
      <p className={Styles.category_text} id={Styles.category}><span className={`${Styles[category.toLowerCase()]}`}></span>{category.toUpperCase()}</p>
      <p><span>Nº de Serviços:</span> {servicesOwned}</p>
      <p><span>Orçamento: </span> R$ {budget}</p>
      <p><span>Utilizado: </span> R$ {cost}</p>
      <div className={Styles.project_card_actions}>
        <Link to={`/project/${id}`}> Visualizar</Link>
        <button onClick={remove}><BsFillTrashFill /> Excluir</button>
      </div>
    </div>
  )
}
export default ProjectCard;
