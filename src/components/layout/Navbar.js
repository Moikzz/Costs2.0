import {Container, Navbar } from "react-bootstrap";
import logo from "../../img/costs_logo.png";
import Nav from 'react-bootstrap/Nav';

function navbar() {
  return (
    <Navbar sticky="top" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/"><img src={logo} alt="costs"/></Navbar.Brand>
        <Nav>
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/projects">Projetos</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/services">Serviços</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/simulation">Simulador</Nav.Link></Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default navbar;
