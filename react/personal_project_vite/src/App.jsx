import { useState } from "react";
import "./App.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { createContext } from "react";
import { api } from "./utilities";

export const userContext = createContext();
  const token = localStorage.token

  function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    const logOut = async () => {
      let response = await api.post("listeners/logout/", {headers: {"Authorization": `token ${token}`}}) 
      if (response.status === 204){
        localStorage.removeItem("token")
        localStorage.removeItem("listener")
        delete api.defaults.headers.common["Authorization"]
        setUser(null)
        navigate("/")
      }
    }

  return (
    <div id="app">
      <header>
        <nav>
          <button onClick={()=>logOut()}>LOG OUT</button>
          <Link to="/register">Register</Link>
          <Link to="/">Log In</Link>
        </nav>
      </header>
      <userContext.Provider value={{ user, setUser }}>
        <Outlet />
      </userContext.Provider>
    </div>
  );
}

export default App
