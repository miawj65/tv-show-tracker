import { useState } from 'react';
import Library from './library.js';
import { getTVShows } from './tvShowService.js';

export default function App() {
  const [list, setList] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  const fetchTVShows = () => {
    getTVShows(searchParam)
    .then(tvShows => {
      setList(tvShows.results.map(tvShow => {
        return {
          id: tvShow.id.replace("title", '').replaceAll("/", ''),
          name: tvShow.title,
          imageSrc: tvShow.image ? tvShow.image.url : ""
        };
      }));
    });
  }

  return(
    <>
      <input type="text" onChange={e => setSearchParam(e.target.value)}></input>
      <input type="button" value="Search" onClick={fetchTVShows}></input>
      <Library tvShows={list} />
    </>
  )
};