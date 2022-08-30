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
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [updatedInformations, setUpdatedInformations] = useState(false);

  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://strateg-in.herokuapp.com/user/${userToken}`
          `http://localhost:4000/user/${userId}`
        );
        setUser(response.data);
        setName(response.data.name);
        setSurname(response.data.surname);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyPassword = () => {
    if (password) {
      if (password.length < 8) {
        setErrorMessage("Your password must contain at least eight characters");
        return false;
      }
      return true;
    }
    return false;
  };

  const verifyName = () => {
    if (name.length < 1 || surname.length < 1) {
      setErrorMessage("Please fill all fields");
      return false;
    }
    return true;
  };

  const verifyNameWithoutPasswordChanged = () => {
    if (password.length < 1) {
      if (name.length < 1 || surname.length < 1) {
        setErrorMessage("Please fill all fields");
        return false;
      }
      return true;
    }
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = user.userId;

    try {
      setErrorMessage("");

      const passwordVerification = verifyPassword();
      if (passwordVerification) {
        const nameVerification = verifyName();

        if (nameVerification) {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.post(
            // "https://strateg-in.herokuapp.com/user/update",
            "http://localhost:4000/user/update",
            {
              userId,
              name,
              surname,
              password,
            }
          );

          setUpdatedInformations(true);
        }
      } else {
        const nameVerification = verifyNameWithoutPasswordChanged();
        if (nameVerification) {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.post(
            // "https://strateg-in.herokuapp.com/user/update",
            "http://localhost:4000/user/update",

            {
              userId,
              name,
              surname,
            }
          );
          setUpdatedInformations(true);
        }
      }
    } catch (error) {
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

        <label className={styles.label} htmlFor="surname">
          Surname:
        </label>
        <input
          className={styles.input}
          type="text"
          id="surname"
          placeholder="Surname"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
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
