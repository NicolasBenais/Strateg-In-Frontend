import { Navigate } from "react-router-dom";

export default function Home({ isTokenPresent }) {
  return isTokenPresent ? (
    <Navigate to="/users" />
  ) : (
    <Navigate to="/register" />
  );
}
