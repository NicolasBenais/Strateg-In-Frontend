import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

// Styles
import styles from "./Register.module.css";

export default function Register({ isTokenPresent }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setErrorMessage("");
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "https://strateg-in.herokuapp.com/register",
        {
          email,
          password,
        }
      );
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return isTokenPresent ? (
    <Navigate to="/users" />
  ) : (
    <main className={styles.main}>
      <h2 className={styles.h2}>Sign Up !</h2>
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
          Create your account
        </button>
      </form>
      <Link className={styles.link} to="/login">
        Already registered ?<br></br>Click here to log in !
      </Link>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </main>
  );
}
