import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SuggestionsPage() {
  const navigate = useNavigate();

  const backToList = () => {
    navigate("../list");
  };

  function gotoDetails(composer) {
    localStorage.setItem("composer", composer);
    navigate("../details/");
  }

  const [composers, setComposers] = useState([]);
  let composersList = [];

  useEffect(() => {
    axios
      .get(
        `https://api.openopus.org/composer/list/epoch/${localStorage.getItem(
          "epoch"
        )}.json`
      )
      .then((response) => {
        setComposers(response.data.composers);
      });
  }, []);

  let randArr = [];
  function getFourRandom(max) {
    while (randArr.length < 4) {
      let rand = Math.floor(Math.random() * max);
      if (!randArr.includes(rand)) randArr.push(rand);
      composersList.push(composers[rand]);
    }
    return true;
  }
  if (composers.length > 4) {
    getFourRandom(composers.length);
  } else {
    composersList = [...composers];
  }

  return (
    <div className="suggestions">
      <h1>Suggested Listening</h1>
      <h2 className="page_title">Try Something New</h2>
      <ul>
        {composersList.map((composer, index) => (
          <div key={index} className="listing">
            <img className="thumbnail" src={composer.portrait} />
            <li>{composer.name}</li>
            <button
              onClick={(event) => {
                gotoDetails(composer.name);
              }}
            >
              details
            </button>
          </div>
        ))}
      </ul>
      <button onClick={backToList}>Back To Your List</button>
    </div>
  );
}
