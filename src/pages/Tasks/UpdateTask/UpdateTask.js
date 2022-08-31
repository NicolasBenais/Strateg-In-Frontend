import { useState, useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import "antd/dist/antd.min.css";
import { DatePicker, InputNumber } from "antd";
import AssignedTo from "../../../components/AssignedTo/AssignedTo";
import moment from "moment";

// Styles
import styles from "./UpdateTask.module.css";

// const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

export default function UpdateTask({ isTokenPresent }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { taskId } = location.state;

  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/task/${taskId}`
        );
        setTask(data);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeTargetDate = (date, dateString) => {
    const updatedTask = { ...task };
    updatedTask.targetDate = dateString;
    setTask(updatedTask);
  };

  const onChangeEstimatedTime = (value) => {
    const updatedTask = { ...task };
    updatedTask.estimatedTime = value;
    setTask(updatedTask);
  };

  const verifyInformations = () => {
    if (
      !task.title ||
      !task.assignedTo ||
      !task.targetDate ||
      !task.estimatedTime
    ) {
      setErrorMessage("Please fill all fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const verifications = verifyInformations();

    if (verifications) {
      try {
        setErrorMessage("");
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(
          "http://localhost:4000/task/update",
          task
        );

        navigate("/");
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return !isTokenPresent ? (
    <Navigate to="/register" />
  ) : (
    !isLoading && (
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="title">
            Title:
          </label>
          <input
            className={styles.input}
            type="text"
            id="title"
            placeholder="Title"
            value={task.title}
            onChange={(event) => {
              const updatedTask = { ...task };
              updatedTask.title = event.target.value;
              setTask(updatedTask);
            }}
          />

          <label className={styles.label} htmlFor="assignedTo">
            Assigned to:
          </label>
          <AssignedTo value={task.assignedTo} task={task} setTask={setTask} />

          <label className={styles.label} htmlFor="targetDate">
            Target date:
          </label>

          <DatePicker
            defaultValue={moment(task.targetDate, dateFormat)}
            format={dateFormat}
            onChange={onChangeTargetDate}
          />

          <label className={styles.label} htmlFor="estimatedTime">
            Estimated time (in min.):
          </label>
          <InputNumber
            className={styles.time_input}
            onChange={onChangeEstimatedTime}
            defaultValue={task.estimatedTime}
            step={10}
          />
          <div className={styles.priority}>
            <label className={styles.label} htmlFor="priority">
              Priority
            </label>
            <input
              type="checkbox"
              id="priority"
              checked={task.priority ? true : false}
              onChange={() => {
                const updatedTask = { ...task };
                updatedTask.priority = !updatedTask.priority;
                setTask(updatedTask);
              }}
            />
          </div>

          <div className={styles.done}>
            <label className={styles.label} htmlFor="done">
              Done:
            </label>
            <input
              type="checkbox"
              checked={task.done ? true : false}
              id="done"
              onChange={() => {
                const updatedTask = { ...task };
                updatedTask.done = !updatedTask.done;
                setTask(updatedTask);
              }}
            />
          </div>

          <button className={styles.button} type="submit">
            Update task
          </button>
        </form>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </main>
    )
  );
}
