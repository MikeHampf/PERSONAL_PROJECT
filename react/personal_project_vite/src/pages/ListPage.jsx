import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate, Outlet, Link } from "react-router-dom";

export function ListPage() {
  const { user, setUser } = useContext(userContext);
  const [list, setList] = useState([]);
  const token = localStorage.token;
  const [title, setTitle] = useState("");
  const [composer, setComposer] = useState("");
  const navigate = useNavigate();
  const [get, setGet] = useState(true);

  api.defaults.headers.common["Authorization"] = `Token ${token}`;

  function gotoDetails(composer) {
    localStorage.setItem("composer", composer);
    navigate("../details/");
  }

  const addListing = async (event) => {
    event.preventDefault();
    if (composer) {
      let response = await api.post("listings/add/", {
        composer_name: composer,
        work_title: title,
      });
      console.log(response.data);
      setComposer("");
      setTitle("");
    }
    setGet(true);
  };

  const removeListing = async (id) => {
    console.log(event);
    let response = await api.delete(`listings/delete/${id}/`);
    console.log(response.data);
    setGet(true);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/list/", {
        headers: { Authorization: `token ${token}` },
      })
      .then((response) => {
        setList(response.data);
      })
      .finally(() => {
        setGet(false);
      });
  }, [get]);

  let border = "";
  for (let i = 0; i < 4; i++) {
    border = border.concat(
      " <> ",
      String.fromCharCode(parseInt("2669", 16), " ")
    );
  }
  border = border.concat(" <>");

  if (list.listings) {
    return (
      <div className="list">
        <h1>Hi {user.name ? user.name : user}!</h1>
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
            <li>{border}</li>
          </div>
          {list.listings.map((item, index) => (
            <div key={item.id} className="listing">
              <li>{item.entry["date added"]}</li>
              <li>{item.entry.work}</li>
              <li id={`composer${index}`}>{item.entry.composer}</li>
              <button
                onClick={() => {
                  gotoDetails(item.entry.composer);
                }}
              >
                details
              </button>
              <button
                onClick={() => {
                  removeListing(item.id);
                }}
              >
                remove
              </button>
            </div>
          ))}
        </ul>
        <div className="add_listing_buttons">
          <input
            className="work"
            placeholder="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>
          <input
            className="composer"
            placeholder="composer *REQUIRED"
            type="text"
            value={composer}
            onChange={(event) => setComposer(event.target.value)}
          ></input>
          <button className="add_to_list_button" onClick={addListing}>
            ADD TO LIST!
          </button>
        </div>
      </div>
    );
  }
}
