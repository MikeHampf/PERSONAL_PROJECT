import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { api } from "../utilities"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


export function DetailsPage() {

    const location = useLocation()
    let composer = location.state

    const [yr, setYr] = useState()
    const [data, setData] = useState({})
    const [history, setHistory] = useState([])
    const [works, setWorks] = useState([])
    const [addTitle, setAddTitle] = useState("")
    const [max, setMax] = useState(0)
    
    const navigate = useNavigate()
    let singleWork = ""

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

    if(!data.death){
        data.death = "STILL ALIVE!"
    }

    useEffect(() => {
        axios.get(`https://api.openopus.org/work/list/composer/${data.id}/genre/all.json`)
            .then((response) => {
                setWorks(response.data.works)
                setMax(response.data.works.length)
            })
        }, [yr])
    let rand = 0
    if(max>0 && works[rand]){
        rand = Math.floor(Math.random()*max)
        singleWork = works[rand].title
    }

    useEffect(() => {
        axios.get(`https://api.api-ninjas.com/v1/historicalevents?year=${yr}`, {headers})
        .then((response) => {
            for(let i=0; i<response.data.length; i++){
            }
            setHistory(response.data)
        })
    }, [yr])

    const getSuggestions = () => {
        console.log(data.epoch)
        navigate("../suggestions/", {state:data.epoch})
    }

    const addListing = async(event) => {
        event.preventDefault();
        if(composer){
            let response = await api.post("listings/add/",{ 
                composer_name: composer,
                work_title: singleWork,
                });
            }     
        }

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
          };

    return (

            <div className="composer_profile">
                <h2 className="page_title">Composer Profile + Some History</h2>
                <div className="work_and_name_and_img">
                    <div className="work_and_name">
                        <h2>Composer:</h2>
                        <h2>{data.complete_name}</h2>
                        <h2>Musical Era:</h2>
                        <h2>{data.epoch}</h2>
                        <button onClick={getSuggestions}>See Other Composers of This Era</button>
                    </div>
                        <img src={data.portrait} />
                </div>
                <h2>Composer Dates:</h2> 
                    <p>BORN: {data.birth}</p> 
                    <p>DIED: {data.death}</p>
                    <h2 className="page_sub_title">LISTEN TO THIS RANDOM PICK!</h2>
                    <div className="listing">
                        <h2>{singleWork}</h2>
                        <button onClick={addListing}>ADD THIS WORK TO YOUR LIST!</button>
                    </div>
                    <button onClick={backToList}>GO BACK TO YOUR LIST!</button>
                    <h3 className="page_sub_title">...Or Continue Reading To Learn About This Composer's World</h3>
                <h2>Historical Events For: {yr}</h2>
                {/* {history.map((event, index) => (
                    <p key={index}>{event.event}</p>
                ))} */}
                <div className="carousel">
                    <Slider {...settings}>
                        {history.map((event, index) => (
                            <h3 key={index}>{event.event}</h3>
                        ))}
                    </Slider>
                </div>
            </div>
    )
}