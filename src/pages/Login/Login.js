import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

// Styles
import styles from "./Login.module.css";

export default function Login({ isTokenPresent, setIsTokenPresent }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setErrorMessage("");

      const response = await axios.post(
        "https://strateg-in.herokuapp.com/login",
        {
          email,
          password,
        }
      );
      Cookies.set("token", response.data.token);
      setIsTokenPresent(true);
      navigate("/users");
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return isTokenPresent ? (
    <Navigate to="/users" />
  ) : (
    <main className={styles.main}>
      <h2 className={styles.h2}>Log In !</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="email">
          Email:
        </label>
        <input
          className={styles.input}
          type="email"
          id="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <label className={styles.label} htmlFor="password">
          Password:
        </label>
        <input
          className={styles.input}
          type="password"
          id="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <button className={styles.button} type="submit">
          Log In
        </button>
      </form>
      <Link className={styles.link} to="/register">
        You don't have an account ?<br></br>Click here to register !
      </Link>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </main>
  );
}
