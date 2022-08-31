import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// Components
import "antd/dist/antd.min.css";
import { DatePicker, InputNumber } from "antd";
import AssignedTo from "../../../components/AssignedTo/AssignedTo";

// Styles
import styles from "./AddTask.module.css";

export default function AddTask({ isTokenPresent }) {
  const navigate = useNavigate();
  const creator = Cookies.get("userId");

  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [priority, setPriority] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const verifyInformations = () => {
    if (!title || !creator || !assignedTo || !targetDate || !estimatedTime) {
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
        const response = await axios.post("http://localhost:4000/task/create", {
          title,
          creator,
          assignedTo,
          targetDate,
          priority,
          estimatedTime,
          done: false,
        });

        navigate("/");
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  const onChangeTargetDate = (date, dateString) => {
    setTargetDate(dateString);
  };

  const onChangeEstimatedTime = (value) => {
    setEstimatedTime(value);
  };

  return !isTokenPresent ? (
    <Navigate to="/register" />
  ) : (
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
          onChange={(event) => setTitle(event.target.value)}
        />

        <label className={styles.label} htmlFor="assignedTo">
          Assigned to:
        </label>
        <AssignedTo setAssignedTo={setAssignedTo} />

        <label className={styles.label} htmlFor="targetDate">
          Target date:
        </label>
        <DatePicker
          className={styles.datePicker_input}
          onChange={onChangeTargetDate}
        />

        <label className={styles.label} htmlFor="estimatedTime">
          Estimated time (min.):
        </label>
        <InputNumber
          className={styles.time_input}
          onChange={onChangeEstimatedTime}
          step={10}
        />
        <div className={styles.priority}>
          <label className={styles.label} htmlFor="priority">
            Priority
          </label>
          <input type="checkbox" onChange={() => setPriority(!priority)} />
        </div>

        <button className={styles.button} type="submit">
          Create task
        </button>
      </form>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </main>
  );
}
