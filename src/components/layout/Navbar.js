import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../img/costs_logo.png";

function Navbar() {
  return (
    <nav>
      <div className={styles.main}>
        <div>
          <Link to="/"><img src={logo} alt="costs" /></Link>
        </div>
        <div>
          <ul className={styles.list}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projetos</Link></li>
            <li><Link to="/services">Serviços</Link></li>
            <li><Link to="/simulation">Simulador</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
