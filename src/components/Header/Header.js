import { Link } from "react-router-dom";
import { useState } from "react";

// Styles
import styles from "./Header.module.css";

// Assets
import Logo from "../../assets/logo";

export default function Header({ isTokenPresent, setIsTokenPresent }) {
  const [shownMenu, setShownMenu] = useState(false);

  const handleShownMenu = () => {
    setShownMenu(!shownMenu);
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo height={"60px"} />
      </Link>

      <nav className={shownMenu ? styles.shownMenu : styles.menu}>
        <Link
          to="/"
          className={styles.link}
          onClick={() => setShownMenu(false)}
        >
          Home
        </Link>
        <Link
          to="/register"
          className={styles.link}
          onClick={() => setShownMenu(false)}
        >
          Register
        </Link>
        <Link
          to="/login"
          className={styles.link}
          onClick={() => setShownMenu(false)}
        >
          Log In
        </Link>
      </nav>
      {!isTokenPresent ? (
        <button
          className={shownMenu ? styles.opennedButton : styles.closedButton}
          onClick={handleShownMenu}
        >
          <span
            className={
              shownMenu ? styles.opennedButton_line : styles.closedButton_line
            }
          ></span>
        </button>
      ) : (
        <Link
          to="/"
          className={styles.logoutButton}
          onClick={() => setIsTokenPresent(false)}
        >
          Logout
        </Link>
      )}
    </header>
  );
}
