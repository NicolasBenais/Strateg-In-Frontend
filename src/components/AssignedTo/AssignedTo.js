import { Select } from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";
import { useEffect, useState } from "react";

// Styles
import styles from "./AssignedTo.module.css";

export default function AssignedTo({
  setAssignedTo,
  disabled,
  value,
  task,
  setTask,
}) {
  const { Option } = Select;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (value) => {
    if (task) {
      const updatedTask = { ...task };
      updatedTask.assignedTo = value;
      setTask(updatedTask);
    } else {
      setAssignedTo(value);
    }
  };

  return (
    <Select
      className={styles.input}
      onChange={handleChange}
      disabled={disabled}
      defaultValue={value ? value : ""}
    >
      {users.map((user) => {
        return (
          <Option key={user._id} value={user._id}>
            {user.surname}
          </Option>
        );
      })}
    </Select>
  );
}
