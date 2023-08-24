import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { api } from "../utilities.jsx";



export const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const registerHandler = async (e) => {
    e.preventDefault();
    let response = await api.post("listeners/signup/", {
      name: userName,
      email:email,
      password: password,
    });
    console.log(response.data)
    let token = response.data.token;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    setUser(response.data);
    setEmail("")
    setPassword("")
    setUserName("")
    navigate("/list/");
  };

    return (
        <div className="register">
            <h1>REGISTER!</h1>
            <input className="userName" placeholder="user name" 
                type="text" 
                value={userName}
                onChange={(event) => setUserName(event.target.value)}></input>
            <input className="email" placeholder="email" 
                type="text" 
                value={email}
                onChange={(event) => setEmail(event.target.value)}></input>
            <input className="password" placeholder="password" 
                type="text" 
                value={password}
                onChange={(event) => setPassword(event.target.value)}></input>
            <button className="register_button" onClick={registerHandler}>SUBMIT!</button>
        </div>
    )
}