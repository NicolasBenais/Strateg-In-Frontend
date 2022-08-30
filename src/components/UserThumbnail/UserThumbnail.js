import axios from "axios";
import { useEffect, useState } from "react";

export default function UserThumbnail({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/${userId}`
        );
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    !isLoading && (
      <p>
        {user.name} {user.surname}
      </p>
    )
  );
}
