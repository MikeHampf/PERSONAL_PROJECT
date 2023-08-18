import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"

export function DetailsPage() {
    // const token = localStorage.token
    const location = useLocation()
    let composer = location.state

    const [yr, setYr] = useState()
    const [data, setData] = useState({})
    const [history, setHistory] = useState([])
    const navigate = useNavigate()

    let work = "place_holder"
    const headers = {
        "X-Api-Key": "o6jXVCtiPN7W8DFM0xZHuQ==7z5Yy10RN3wpsxHG"
    }

    const backToList = () => {
        navigate("../list")
    }

    useEffect(() => {
        axios.get(`https://api.openopus.org/composer/list/search/${composer}.json`)
            .then((response) => {
                setData(response.data.composers[0])
                let year = response.data.composers[0].birth
                year = (year[0]*1000 + year[1]*100 + year[2]*10 + year[3]*1)
                setYr(year)
            })
        }, [])

    console.log(yr)

    useEffect(() => {
        axios.get(`https://api.api-ninjas.com/v1/historicalevents?year=${yr}`, {headers})
        .then((response) => {
            for(let i=0; i<response.data.length; i++){
            }
            setHistory(response.data)
        })
    }, [yr, composer])

    const getSuggestions = () => {
        console.log(data.epoch)
        navigate("../suggestions/", {state:data.epoch})
    }

    return (
        <div className="composer_profile">
            <h2 className="page_title">Composer Profile + Some History</h2>
            <div className="work_and_name_and_img">
                <div className="work_and_name">
                    <h2>Work:</h2>
                    <h2>{work}</h2>
                    <h2>Composer:</h2>
                    <h2>{data.complete_name}</h2>
                    <button onClick={getSuggestions}>Get Listening Suggestions</button>
                </div>
                    <img src={data.portrait} />
            </div>
            <h2>Composer Details:</h2> 
                <p>Birthdate: {data.birth}</p> 
                <p>Deathdate: {data.death}</p>
                <h2>Musical Era:  {data.epoch}</h2>
                <button onClick={backToList}>Back To Your List</button>
            <h2>Historical Events For: {yr}</h2>
            {history.map((event, index) => (
                <p key={index}>{event.event}</p>
            ))}
        </div>
    )
}