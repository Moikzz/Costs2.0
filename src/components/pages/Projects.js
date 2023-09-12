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
  const [services, setServices] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState("")

  const percentage = (a,b) => (`(${Math.round((parseInt(a) / parseInt(b)) * 100)}%)`)
  const format = (number) => number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")

  const totalBudget = projects.map((project) => parseInt(project?.budget)).reduce((acc, val) => acc + val, 0)
  const totalCost = services.map((service) => parseInt(service?.cost)).reduce((acc, val) => acc + val, 0)
  const totalRemain = totalBudget - totalCost
  
  const location = useLocation()
  const nothing = '--'
  let message = ""

  if (location.state) {message = location.state.message}

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        await fetch("http://localhost:5000/projects", {method: "GET", headers: {"Content-Type": "application/json"}})
        .then((resp) => resp.json())
        .then((data) => {setProjects(data)})
        .then(await fetch(`http://localhost:5000/services`, {method: "GET", headers: {"content-type" : "application/json"}})
        .then((resp) => resp.json())
        .then((data) => {setServices(data); setRemoveLoading(true)}))
        .catch((err) => console.log(err))
      }; fetchData()
    }, 400)
  }, [])

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {method: "DELETE", headers: {"Content-type": "application/json"}})
    .then((resp) => resp.json())
    .then(() => {setProjects(projects.filter((project) => project.id !== id)); setProjectMessage("Projeto Removido!")})
    .catch((err) => console.log(err))
  }
  
  const projectCost = (id) => {
    return services?.filter((service) => parseInt(service?.OwnerID?.id) === id)
      .map((service) => parseInt(service?.cost))
      .reduce((acc, val) => acc + val, 0)
  }

  const ownedServicesCount = (id) => {
    return services.filter((thoseServices) => parseInt(thoseServices?.OwnerID?.id) === id).length
  }

  function showServicesOwned (project) {
    if (ownedServicesCount(project.id) > 0) {
      return ownedServicesCount(project.id)} 
    else {return nothing}
  }

  function showCost (project) {
    if (projectCost(project.id) > 0) {
      return `R$ ${format(projectCost(project?.id))},00 ${percentage((projectCost(project?.id)), (parseInt(project?.budget)))}`} 
    else {return nothing}
  }

  function showBudget (project) {
    if (project.budget > 0) {
      return `R$ ${format(project.budget)},00`} 
    else {return nothing}
  }

  function showTotal (data) {
    if (data > 0) {
      return `R$ ${format(data)},00`} 
    else {return nothing}
  }

  return (<>
    {!removeLoading && <Loading/>}
    {removeLoading === true && <>
      {projects.length > 1 ? (<>
          <div className={styles.title}>
            <h1>Meus Projetos</h1>
            <LinkButton to="/NewProject" text="Criar Projeto" />
          </div>
          {message && <Message type="succsess" msg={message} />}
          {projectMessage && <Message type="succsess" msg={projectMessage} />}
          <Container>
            <div className={styles.projectCard}>
              {projects.length > 1 && projects.filter((projects) => projects.id > 0).map((project) => (
                <ProjectCard
                  id={project.id}
                  key={project.id}
                  name={project.name}
                  category={project.category.name}
                  servicesOwned={showServicesOwned(project)}
                  budget={showBudget(project)}
                  cost={showCost(project)}
                  handleRemove={removeProject}
                />))}
            </div>
            {projects.length > 1 && <>
              <div className={styles.total}>
                <div className={styles.total_container}>
                  <p>Investimento Total: {showTotal(totalBudget)}</p>
                </div>
                <div className={styles.total_container}>
                  <p>Total Restante: {showTotal(totalRemain)}</p>
                </div>
              </div>
            </>}
          </Container>
      </>) : (<>
        <div className={styles.project}>
          <div className={styles.title}>
            <h1>Meus Projetos</h1>
            <LinkButton to="/newproject" text="Criar Projeto" />
          </div>
          <NoData dataType={'Projetos'}/>
        </div>
      </>)}
    </>}
  </>)
}

export default Projects;
