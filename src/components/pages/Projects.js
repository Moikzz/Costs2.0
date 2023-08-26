import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import NoData from "../layout/NoData"
import Message from "../layout/Message"
import Loading from "../layout/Loading"
import Container from "./../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"

import styles from "./Projects.module.css"

function Projects() {
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([]);
  const [projectMessage, setProjectMessage] = useState("")
  const [removeLoading, setRemoveLoading] = useState(false)

  // const percentage = (a,b) => (`(${Math.round((a / b) * 100)}%)`)
  const format = (number) => number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")

  const totalBudget = projects.map((project) => parseFloat(project.budget)).reduce((acc, val) => acc + val, 0)
  const totalCost = projects.map((project) => parseFloat(project.cost)).reduce((acc, val) => acc + val, 0)
  const totalRemain = totalBudget - totalCost
  const location = useLocation()
  const nothing = '--'
  let message = ""

  if (location.state) {message = location.state.message}

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {method: "GET", headers: {"Content-Type": "application/json"}})
      .then((resp) => resp.json())
      .then((data) => {setProjects(data); setRemoveLoading(true)})
      .catch((err) => console.log(err))
    }, 400)
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      await fetch(`http://localhost:5000/services`, {method: "GET", headers: {"content-type" : "application/json"}})
      .then((resp) => resp.json())
      .then((data) => setServices(data))
      .catch((err) => console.log(err))
    }
    fetchServices()
  }, [])

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {method: "DELETE", headers: {"Content-type": "application/json"}})
    .then((resp) => resp.json())
    .then(() => {setProjects(projects.filter((project) => project.id !== id)); setProjectMessage("Projeto Removido!")})
    .catch((err) => console.log(err))
  }
  
  function projectCost (id) {
    const thoseServices = services.filter((service) => parseInt(service.OwnerID.id) === id)
    const serviceCostArray = thoseServices.map((service) => parseInt(service.cost))
    const total = serviceCostArray.reduce((acc, val) => acc + val)
    return format(total);
  }

  // Tentar tirar o RemoveLoading pra ver se fica como a Página Project e Service
  // Colocar o Condicional do Loading dentro de tudo
  // Colocar o Condicional do NoData dentro do Loading

  return (<> 
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/NewProject" text="Criar Projeto" />
      </div>
      {message && <Message type="succsess" msg={message} />}
      {projectMessage && <Message type="succsess" msg={projectMessage} />}
      <Container customClass="start">
        <div className={styles.projectCard}>
          {projects.length > 0 && projects.map((project) => (
            <ProjectCard
              id={project.id}
              key={project.id}
              name={project.name}
              category={project.category.name}
              budget={project.budget ? (`${format(project.budget)},00`) : nothing}
              cost={project.budget ? (`${projectCost(project.id)},00`) : nothing}
              handleRemove={removeProject}
            />))}
        </div>
        {projects.length > 0 && <>
          <div className={styles.total}>
            <div className={styles.total_container}><h3>Investimento Total: {totalBudget ? (`R$ ${format(totalBudget)},00`) : nothing}</h3></div>
            <div className={styles.total_container}><h3>Total Restante: {totalRemain ? (`R$ ${format(totalRemain)},00`) : nothing}</h3></div>
          </div>
        </>}
        {removeLoading && projects.length === 0 && <NoData dataType={'projetos'}/>}
        {!removeLoading && <Loading />}
      </Container>
    </div>
  </>)
}

export default Projects;
