import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";

// Components
import Header from "./components/Header";

function App() {
  const [isTokenPresent, setIsTokenPresent] = useState(
    Cookies.get("token") ? true : false
  );

  return (
    <Router>
      <Header isTokenPresent={isTokenPresent} />
      <Routes>
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
          path="/users"
          element={<Users isTokenPresent={isTokenPresent} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
