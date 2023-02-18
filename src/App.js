import { useState } from "react";
import Library from "./library.js";
import { getTVShows } from "./tvShowService.js";
import { addUpdateUsers } from "./sqlconnection.js";

export default function App() {
  const [list, setList] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [username, setUsername] = useState("");

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

  const userLogin = () => {
    addUpdateUsers(username);
  }

  return(
    <>
      <input type="text" onChange={e => setUsername(e.target.value)}></input>
      <input type="button" value="Login" onClick={userLogin}></input>
      <input type="text" onChange={e => setSearchParam(e.target.value)}></input>
      <input type="button" value="Search" onClick={fetchTVShows}></input>
      <Library tvShows={list} />
    </>
  )
};