import { Button } from "react-bootstrap";

function LinkButton({ to, text }) {
  return (<Button href={to}>{text}</Button>)
}
export default LinkButton;