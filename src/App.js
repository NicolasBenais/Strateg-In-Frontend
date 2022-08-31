import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import AddTask from "./pages/Tasks/AddTask/AddTask";
import UpdateTask from "./pages/Tasks/UpdateTask/UpdateTask";

// Components
import Header from "./components/Header/Header";

function App() {
  const [isTokenPresent, setIsTokenPresent] = useState(
    Cookies.get("token") ? true : false
  );

  return (
    <Router>
      <Header
        isTokenPresent={isTokenPresent}
        setIsTokenPresent={setIsTokenPresent}
      />
      <Routes>
        <Route path="/" element={<Home isTokenPresent={isTokenPresent} />} />

        <Route
          path="/register"
          element={
            <Register
              isTokenPresent={isTokenPresent}
              setIsTokenPresent={setIsTokenPresent}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              isTokenPresent={isTokenPresent}
              setIsTokenPresent={setIsTokenPresent}
            />
          }
        />

        <Route
          path="/profile"
          element={<Profile isTokenPresent={isTokenPresent} />}
        />

        <Route
          path="/tasks/add-task"
          element={<AddTask isTokenPresent={isTokenPresent} />}
        />

        <Route
          path={"/task/update"}
          element={<UpdateTask isTokenPresent={isTokenPresent} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
