import { useState, useEffect, useContext } from "react";
import "./App.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { createContext } from "react";
import { api } from "./utilities";

export const userContext = createContext();

  function App() {
    const [user, setUser] = useState();
    const navigate = useNavigate()

    const logOut = async () => {
      let response = await api.post("listeners/logout/") 
      if (response.status === 204){
        localStorage.removeItem("token")
        localStorage.removeItem("listener")
        delete api.defaults.headers.common["Authorization"]
        setUser(null)
        navigate("/")
      }
    }

    useEffect(() => {
      const whoAmI = async () => {
        let token = localStorage.getItem("token")
        if(token){
          api.defaults.headers.common["Authorization"] = `Token ${token}`
          let response = await api.get("listeners/info/")
          if(response.data.email){
            setUser(response.data)
            navigate("list/", {user: response.data})
          }
        }
        else{
          navigate("/")
        }
      };
      whoAmI()
    }, []);

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
