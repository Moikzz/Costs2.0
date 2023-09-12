import { Container } from "react-bootstrap";

function container(props) {
  return (
    <Container className="container-limit">
      {props.children}
    </Container>
  );
}
export default container;
