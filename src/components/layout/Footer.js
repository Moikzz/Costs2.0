import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import {Container, Navbar } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';

function Footer() {
  return (
    <Navbar fixed="bottom" bg="dark">
      <Container className="vstack gap-1">
      <Nav className="justify-content-center">
        <Nav.Item><Nav.Link><FaFacebook  id="footer-link"/></Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link><FaInstagram id="footer-link"/></Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link><FaLinkedin  id="footer-link"/></Nav.Link></Nav.Item>
      </Nav>
      <div id="footer"><p><span> Costs 2.0 </span> &copy; {new Date().getFullYear()}</p></div>
      </Container>
    </Navbar>
  );
}
export default Footer;
