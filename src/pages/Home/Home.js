import { Navigate } from "react-router-dom";

// Styles
import styles from "./Home.module.css";

export default function Home({ isTokenPresent }) {
  return !isTokenPresent ? (
    <Navigate to="/register" />
  ) : (
    <main className={styles.main}>Taches</main>
  );
}
