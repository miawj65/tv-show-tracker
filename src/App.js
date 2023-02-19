import { useState } from "react";
import Library from "./library.js";
import UserLibrary from "./userLibrary.js";
import { getTVShows } from "./tvShowService.js";

export default function App() {
  const [list, setList] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);
  const [userList, setUserList] = useState([]);

  const fetchTVShows = () => {
    getTVShows(searchParam)
    .then(tvShows => {
      setList(tvShows.results.map(tvShow => {
        return {
          id: tvShow.id.replace("title", "").replaceAll("/", ""),
          name: tvShow.title,
          imageSrc: tvShow.image ? tvShow.image.url : ""
        };
      }));
    });
  }

  async function userLogin() {
    let data = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    }
    await fetch("/api/addUpdateUsers", data).then(response => 
      response.json().then(data => ({
          data: data,
          status: response.status
      })
    ).then(res => {
        let id = res.data.recordset[0].UserID;
        setUserId(id);
        userData(id);
    }));
  }

  async function userData(userId) {
    let data = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId
      })
    }
    await fetch("/api/getTVShows", data).then(response => 
      response.json().then(data => ({
          data: data,
          status: response.status
      })
    ).then(res => {
      let parsedData = JSON.parse(res.data.recordset[0].TVShows);
      if(!parsedData) return;
      setUserList(parsedData);
      setUserList(parsedData.map(data => {
        return {
          id: data.TVShowID,
          name: data.Name
        };
      }));
    }));
  }

  return(
    <>
      <input type="text" onChange={e => setUsername(e.target.value)}></input>
      <input type="button" value="Login" onClick={userLogin}></input>
      <input type="text" onChange={e => setSearchParam(e.target.value)}></input>
      <input type="button" value="Search" onClick={fetchTVShows}></input>
      <UserLibrary tvShows={userList} currentUserId={userId} />
      <Library tvShows={list} currentUserId={userId} />
    </>
  )
};