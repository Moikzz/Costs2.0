import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import NoData from "../layout/NoData";
import Message from "../layout/Message";
import Loading from "../layout/Loading";
import Container from "./../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";

import styles from "./Projects.module.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  const totalBudget = projects.map((project) => parseFloat(project.budget)).reduce((acc, val) => acc + val, 0)
  const totalCost = projects.map((project) => parseFloat(project.cost)).reduce((acc, val) => acc + val, 0)
  const totalRemain = totalBudget - totalCost
  const format = (number) => number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")

  useEffect(() => {
    // lembrar de tirar depois.
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 4000000);
  }, []);

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage("Projeto Removido!");
      })
      .catch((err) => console.log(err));
  }


  return (<> 
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/NewProject" text="Criar Projeto" />
      </div>
      {message && <Message type="succsess" msg={message} />}
      {projectMessage && <Message type="succsess" msg={projectMessage} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              key={project.id}
              name={project.name}
              category={project.category.name}
              budget={format(project.budget)}
              cost={`${format(project.cost)} (${Math.round((project.cost / project.budget) * 100)}%)`}
              handleRemove={removeProject}
            />
          ))}
        
        {removeLoading && projects.length === 0 && <NoData dataType={'projetos'}/>}
      </Container>
      {projects.length > 0 && <>
          <div className={styles.total_container}>
            <h3>Investimento total: R$ {format(totalBudget)}</h3>
          </div>
          <div className={styles.total_container}>
            <h3>Total restante: R$ {format(totalRemain)}<span> {`(${Math.round(totalRemain/totalBudget * 100)}%)`}</span></h3>
          </div>
        </>}
    </div>
    {!removeLoading && <Loading />}
    </>);
}

export default Projects;
