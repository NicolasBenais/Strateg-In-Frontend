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
    <main>
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
        <Link to="/login">
          You don't have an account ? Click here to register !
        </Link>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </main>
  );
}
