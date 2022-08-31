import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import "antd/dist/antd.min.css";
import { DatePicker, InputNumber } from "antd";
import AssignedTo from "../../components/AssignedTo/AssignedTo";

// Styles
import styles from "./Home.module.css";

export default function Home({ isTokenPresent }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/tasks");
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
    !isLoading && (
      <main className={styles.main}>
        <Link to="/tasks/add-task">+ Add task</Link>

        {tasks.map((task) => {
          return (
            !task.done && (
              <form className={styles.form} key={task._id}>
                <input
                  className={styles.input}
                  type="text"
                  value={task.title}
                  disabled={true}
                />

                <AssignedTo disabled={true} />

                <DatePicker
                  className={styles.datePicker_input}
                  disabled={true}
                />

                <InputNumber
                  className={styles.time_input}
                  step={10}
                  disabled={true}
                />

                <input type="checkbox" name="" id="" />
                <Link to="/task/update" state={{ taskId: task._id }}>
                  <button className={styles.button}>Modify</button>
                </Link>
              </form>
            )
          );
        })}
      </main>
    )
  );
}
