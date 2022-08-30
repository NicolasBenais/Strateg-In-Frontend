import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Styles
import styles from "./Profile.module.css";

export default function Profile({ isTokenPresent }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [updatedInformations, setUpdatedInformations] = useState(false);

  const userToken = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://strateg-in.herokuapp.com/user/${userToken}`
        );
        setUser(response.data);
        setName(response.data.name);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = user.userId;

    try {
      setErrorMessage("");

      if (name.length < 1) {
        setErrorMessage("You must enter a name");
      } else {
        if (password) {
          if (password.length < 8) {
            setErrorMessage(
              "Your password must contain at least eight characters"
            );
          } else {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(
              // "https://strateg-in.herokuapp.com/user/update",
              "http://localhost:4000/user/update",
              {
                userId,
                name,
                password,
              }
            );
            setUpdatedInformations(true);
          }
        } else {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.post(
            // "https://strateg-in.herokuapp.com/user/update",
            "http://localhost:4000/user/update",

            {
              userId,
              name,
            }
          );
          setUpdatedInformations(true);
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return !isTokenPresent ? (
    <Navigate to="/register" />
  ) : isLoading ? (
    <main className={styles.main}>
      <p>Loading...</p>
    </main>
  ) : (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Email:</label>
        <input
          className={styles.ReadyOnly_input}
          type="text"
          value={user.email}
          readOnly={true}
        />

        <label className={styles.label} htmlFor="name">
          Name:
        </label>
        <input
          className={styles.input}
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label className={styles.label} htmlFor="password">
          New Password:
        </label>
        <input
          className={styles.input}
          type="password"
          id="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        {!updatedInformations ? (
          <button className={styles.button} type="submit">
            Save
          </button>
        ) : (
          <p>Your informations have been updated !</p>
        )}
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </main>
  );
}
