import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../utilities";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function DetailsPage() {
  const [yr, setYr] = useState();
  const [data, setData] = useState({});
  const [history, setHistory] = useState([]);
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();

  const headers = {
    "X-Api-Key": "o6jXVCtiPN7W8DFM0xZHuQ==7z5Yy10RN3wpsxHG",
  };

  const backToList = () => {
    navigate("../list");
  };

  useEffect(() => {
    axios
      .get(
        `https://api.openopus.org/composer/list/search/${localStorage.getItem(
          "composer"
        )}.json`
      )
      .then((response) => {
        setData(response.data.composers[0]);
        let year = response.data.composers[0].birth;
        year = year[0] * 1000 + year[1] * 100 + year[2] * 10 + year[3] * 1;
        setYr(year);
      });
  }, []);

  if (!data.death) {
    data.death = "STILL ALIVE!";
  }

  useEffect(() => {
    axios
      .get(`https://api.api-ninjas.com/v1/historicalevents?year=${yr}`, {
        headers,
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {}
        setHistory(response.data);
      });
  }, [yr]);

  const getSuggestions = () => {
    console.log(data.epoch);
    localStorage.setItem("epoch", data.epoch);
    navigate("../suggestions/");
  };

  const addListing = async (event) => {
    event.preventDefault();
    if (localStorage.getItem("composer")) {
      await api.post("listings/add/", {
        composer_name: localStorage.getItem("composer"),
        work_title: localStorage.getItem("randomPick"),
      });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  useEffect(() => {
    async function getAdditionalWork(id) {
      const response = await axios.get(
        `https://api.openopus.org/work/list/composer/${id}/genre/all.json`
      );
      setWorks(response.data.works);
    }
    getAdditionalWork(data.id);
  }, [data]);
  if (works) {
    let maxx = works.length;
    let rand = Math.floor(Math.random() * maxx);
    let suggestion = works[rand];
    const clone = { ...suggestion };
    localStorage.setItem("randomPick", clone.title);
  }

  return (
    <div className="composer_profile">
      <h2 className="page_title">Composer Profile + Some History</h2>
      <div className="work_and_name_and_img">
        <div className="work_and_name">
          <h2>Composer:</h2>
          <h2>{data.complete_name}</h2>
          <h2>Musical Era:</h2>
          <h2>{data.epoch}</h2>
          <button onClick={getSuggestions}>
            See Other Composers of This Era
          </button>
        </div>
        <img src={data.portrait} />
      </div>
      <h2>Composer Dates:</h2>
      <h3>BORN: {data.birth}</h3>
      <h3>DIED: {data.death}</h3>
      <h2 className="page_sub_title">LISTEN TO THIS RANDOM PICK!</h2>
      <div className="listing">
        <h2>{localStorage.getItem("randomPick")}</h2>
        <button onClick={addListing}>ADD THIS WORK TO YOUR LIST!</button>
      </div>
      <button onClick={backToList}>GO BACK TO YOUR LIST!</button>
      <h3 className="page_sub_title">
        ...Or Continue Reading To Learn About This Composer's World
      </h3>
      <h2>Historical Events For: {yr}</h2>
      <div className="carousel">
        <Slider {...settings}>
          {history.map((event, index) => (
            <h3 key={index}>{event.event}</h3>
          ))}
        </Slider>
      </div>
    </div>
  );
}
