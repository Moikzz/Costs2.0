import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Project from "./components/pages/Project";
import Service from "./components/pages/Service";
import Projects from "./components/pages/Projects";
import Services from "./components/pages/Services";
import Container from "./components/layout/Container";
import NewProject from "./components/pages/NewProject";
import NewService from "./components/pages/NewService";
import Simulation from "./components/pages/Simulation";

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/newservice" element={<NewService />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/service/:id" element={<Service />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

// Consertar a cor dos botões
// terminar de passar o projeto pra um só CSS otimizado (pra depois passar pro SASS)
// Fazer *Carousel* nos conjuntos de cards
// Fazer *Progress bar* nos cards individuais
// Colocar animações de Hover, transições, NavBar Tabs e etc (deixar mucho biito)
// Instalar SASS e fazer tema CLARO & ESCURO
// Harmonizar a disposição dos botões e as posições dos componentes no geral
// tentar melhorar o "Total" (quem sabe colocar uma progress-bar dinâmica tipo "fuel gauge")

// Carregar o formulário de edição de serviços com os dados (igual no projects)
// Associar cada serviço com 1 ou mais projetos (array de project owner)
// Criar camada de simulação baseado em funções que contenham cálculos de tempo
// Criar subcamada de dados (assets que podem ter serviços que podem ter projetos e qualquer coisa um entre o outro)

// Fazer tema customizado (quem sabe até uma mini nav pra selecionar temas e controlar com state)
// Fazer helper functions pra tratar as chamadas e assim chamar só 1 vez a cada reload

export default App;