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

  return (<>
    {!removeLoading && <Loading/>}
    {removeLoading === true && <>
      {projects.length !== 0 ? (<>
          <div className={styles.project_container}>
            <div className={styles.title_container}>
              <h1>Meus Projetos</h1>
              <LinkButton to="/NewProject" text="Criar Projeto" />
            </div>
            {message && <Message type="succsess" msg={message} />}
            {projectMessage && <Message type="succsess" msg={projectMessage} />}
            <Container customClass="start">
              <div className={styles.projectCard}>
                {projects.length > 0 && projects.filter((projects) => projects.id > 0).map((project) => (
                  <ProjectCard
                    id={project.id}
                    key={project.id}
                    name={project.name}
                    category={project.category.name}
                    servicesOwned={ownedServicesCount(project.id) > 0 ? (ownedServicesCount(project.id)) : nothing}
                    budget={project.budget > 0 ? (`${format(project.budget)},00`) : nothing}
                    cost={projectCost(project.id) > 0 ? (`${format(projectCost(project?.id))},00 ${percentage((projectCost(project?.id)), (parseInt(project?.budget)))}`) : nothing}
                    handleRemove={removeProject}
                  />))}
              </div>
              {projects.length > 0 && <>
                <div className={styles.total}>
                  <div className={styles.total_container}>
                    <h3>Investimento Total:</h3>
                    <h3>{totalBudget > 0  ? (`R$ ${format(totalBudget)},00`) : nothing}</h3>
                    </div>
                  <div className={styles.total_container}>
                    <h3>Total Restante: </h3>
                    <h3>{totalRemain > 0 ? (`R$ ${format(totalRemain)},00`) : nothing}</h3>
                  </div>
                </div>
              </>}
            </Container>
          </div>
      </>) : (<>
        <div className={styles.project_container}>
          <div className={styles.title_container}>
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
