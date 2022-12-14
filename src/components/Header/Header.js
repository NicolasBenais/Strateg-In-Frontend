import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Styles
import styles from "./Header.module.css";

// Assets
import Logo from "../../assets/logo";
import Cookies from "js-cookie";

export default function Header({ isTokenPresent, setIsTokenPresent }) {
  const navigate = useNavigate();

  const [shownMenu, setShownMenu] = useState(false);

  const handleShownMenu = () => {
    setShownMenu(!shownMenu);
  };

  const logOut = () => {
    setIsTokenPresent(false);
    Cookies.remove("token");
    navigate("/register");
    setShownMenu(false);
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

        {!isTokenPresent ? (
          <Link
            to="/register"
            className={isTokenPresent ? styles.disabled : styles.link}
            onClick={() => setShownMenu(false)}
          >
            Sign Up
          </Link>
        ) : (
          <Link
            to="/profile"
            className={styles.link}
            onClick={() => setShownMenu(false)}
          >
            Profile
          </Link>
        )}

        {!isTokenPresent ? (
          <Link
            to="/login"
            className={isTokenPresent ? styles.disabled : styles.link}
            onClick={() => setShownMenu(false)}
          >
            Log In
          </Link>
        ) : (
          <button className={styles.logoutButton} onClick={logOut}>
            Logout
          </button>
        )}
      </nav>

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
    </header>
  );
}
