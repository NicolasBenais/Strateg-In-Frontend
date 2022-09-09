import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

// Styles
import styles from "./Register.module.css";

export default function Register({ isTokenPresent }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const verifyFormInformations = () => {
    if (!email || !name || !surname || !password) {
      setErrorMessage("Please fill all fields");
      return false;
    }
    return true;
  };

  const verifyPassword = () => {
    if (password.length < 8) {
      setErrorMessage("Your password must contain at least eight characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstVerification = verifyFormInformations();
    if (firstVerification) {
      const secondVerification = verifyPassword();
      if (secondVerification) {
        try {
          setErrorMessage("");

          // eslint-disable-next-line no-unused-vars
          const response = await axios.post(
            "https://strateg-in.herokuapp.com/register",
            // "http://localhost:4000/register",
            {
              email,
              name,
              surname,
              password,
            }
          );

          navigate("/login");
        } catch (error) {
          setErrorMessage(error.response.data.message);
        }
      }
    }
  };

  return isTokenPresent ? (
    <Navigate to="/" />
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

        <label className={styles.label} htmlFor="name">
          Name:
        </label>

        <input
          className={styles.input}
          type="text"
          id="name"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />

        <label className={styles.label} htmlFor="surname">
          Surname:
        </label>

        <input
          className={styles.input}
          type="text"
          id="surname"
          placeholder="Surname"
          onChange={(event) => setSurname(event.target.value)}
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
