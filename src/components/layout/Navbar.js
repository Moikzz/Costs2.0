import { Link } from "react-router-dom";
import logo from "../../img/costs_logo.png";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>

        <div className={styles.mainNavbar}>
        <div>
        <Link to="/">
          <img src={logo} alt="costs" />
        </Link>
        </div>
        <div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/projects">Projetos</Link>
          </li>
          <li className={styles.item}>
            <Link to="/services">Serviços</Link>
          </li>
          <li className={styles.item}>
            <Link to="/simulation">Simulador</Link>
          </li>
        </ul>
        </div>
        </div>
    </nav>
  );
}
export default Navbar;
