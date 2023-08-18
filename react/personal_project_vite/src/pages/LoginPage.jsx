import { useState, useContext, useEffect } from "react";
import { userContext } from "../App";
import { api } from "../utilities.jsx";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()
    const { setUser } = useContext(userContext);

    const loginHandler = async (e) => {
        e.preventDefault();
        let response = await api.post("listeners/login/", {
            email: email,
            password: password,
        });
        let token = response.data.token;
        let user = response.data.listener;
        localStorage.setItem("token", token);
        localStorage.setItem("listener", user)
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        setUser(user)
        setEmail("")
        setPassword("")
        if(token){
            navigate("list/")
        }
    }

  return (
    <div className="login">
        <h2 className="page_title">WELCOME TO MUSIC + HISTORY!</h2>
        <h3>It's not music history, it's music + history</h3>
        <h1>Log Yourself In!</h1>
        <input className="email" placeholder="email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input className="password" placeholder="password"
            type="text" 
            value={password}
            onChange={(event) => setPassword(event.target.value)}>
        </input>
        <button className="login_button" onClick={loginHandler}>LOGIN!</button>
    </div>
  );
};