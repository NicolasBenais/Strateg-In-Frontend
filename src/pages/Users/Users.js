import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

// Styles
import styles from "./Users.module.css";

export default function Users({ isTokenPresent }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://strateg-in.herokuapp.com/users"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return !isTokenPresent ? (
    <Navigate to="/register" />
  ) : (
    <main className={styles.main}>
      {isLoading ? (
        <p className={styles.loader}>Loading...</p>
      ) : (
        <>
          <h2 className={styles.h2}>Registered users</h2>
          <ul className={styles.list}>
            {data.map((user) => {
              return <li key={user._id}>{user.email}</li>;
            })}
          </ul>
        </>
      )}
    </main>
  );
}
