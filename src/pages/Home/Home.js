import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import UserThumbnail from "../../components/UserThumbnail/UserThumbnail";

// Styles
import styles from "./Home.module.css";

export default function Home({ isTokenPresent }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/tasks");
        console.log(response.data);
        setTasks(response.data);
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
      <Link to="/tasks/add-task">+ Add task</Link>

      {/* {tasks.map((task) => {
        return (
          <div className={styles.container} key={task._id}>
            <UserThumbnail userId={task.assignedTo} />
          </div>
        );
      })} */}
    </main>
  );
}
