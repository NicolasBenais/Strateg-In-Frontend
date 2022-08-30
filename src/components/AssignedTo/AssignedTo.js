import { Select } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useEffect, useState } from "react";

// Styles
import styles from "./AssignedTo.module.css";

export default function AssignedTo({ setAssignedTo }) {
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
    setAssignedTo(value);
  };

  return (
    <Select className={styles.input} onChange={handleChange}>
      {users.map((user, index) => {
        return (
          <Option key={user._id} value={user._id}>
            {user.surname}
          </Option>
        );
      })}
    </Select>
  );
}
