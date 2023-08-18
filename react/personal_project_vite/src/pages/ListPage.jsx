import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate, Outlet, Link } from "react-router-dom";

export function ListPage() {
    const { user, setUser } = useContext(userContext);
    const[list, setList] = useState([])
    const token=localStorage.token
    const [title, setTitle] = useState("")
    const [composer, setComposer] = useState("")
    const [details, setDetails] = useState("")
    const [id, setId] = useState()
    const navigate = useNavigate()

    api.defaults.headers.common["Authorization"] = `Token ${token}`;

    function gotoDetails(composer){
        console.log(composer)
        navigate("../details/", {state: composer})
    }

    const addListing = async(event) => {
        event.preventDefault();
        if(composer){
            let response = await api.post("listings/add/",{ 
                composer_name: composer,
                work_title: title,
                });
                console.log(response.data)
                setComposer("")
                setTitle("")
            }     
        }
    
    const removeListing = async(event) => {
        console.log(event)
            let response = await api.delete(`listings/delete/${id}/`)
            console.log(response.data)
            setId()
    }

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/v1/list/", {headers: {"Authorization": `token ${token}`}})
        .then((response)=>{
            setList(response.data)
        })
    },[token, composer, id])

    if(list.listings){
        return (
            <div className="list">
                <h1>Hi {user}!</h1>
                <h2 className="page_title">Current Listings</h2>
                <ul>
                    <div className="listing">
                        <li>DATE ADDED</li>
                        <li>WORK</li>
                        <li>COMPOSER</li>
                        <li>DETAILS</li>
                        <li>LOSE IT</li>
                    </div>
                    <div>
                        <li>{"<><><><><><><><><><>"}</li>
                    </div>
                    {list.listings.map((item, index) => (
                        <div key={index} className="listing">
                            <li>{item.entry["date added"]}</li>
                            <li>{item.entry.work}</li>
                            <li id={`composer${index}`}>{item.entry.composer}</li>
                            <button onClick={(event) => {gotoDetails(item.entry.composer)
                                                        }}>details</button>
                            <button onClick={(event) =>{setId(item.id)
                                                        removeListing(item.id)}}>remove</button>
                        </div>
                    ))}
                </ul>
                <div className="add_listing_buttons">
                    <input className="work" placeholder="title"
                        type="text" 
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}>
                    </input>
                    <input className="composer" placeholder="composer *REQUIRED"
                        type="text"
                        value={composer}
                        onChange={(event) => setComposer(event.target.value)}>
                    </input>
                    <button className="add_to_list_button" onClick={addListing}>ADD TO LIST!</button>
                </div>
            </div>
        )
    }
}