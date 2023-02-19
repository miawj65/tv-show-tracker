import { useState, useEffect } from "react";
import "./App.css";
import { getTVShowEpisodes } from "./tvShowService.js";
import Episodes from "./episode.js";
import Shelf from "./shelf.js";

export default function Library(tvShowList) {
  const [list, setList] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [episodeList, setEpisodeList] = useState([]);
  const [TVShowID, setTVShowID] = useState("");

  useEffect(() => { 
    setList(tvShowList.tvShows)
  }, [tvShowList.tvShows] );

  function handleViewEpisodesClick(tvShowId){
    setTVShowID(tvShowId);
    getTVShowEpisodes(tvShowId)
    .then(seasons => {
      setSeasonList(seasons);
    });
  }

  async function handleAddClick(tvShowId, tvShowName){
    let data = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tvShowId: tvShowId,
        name: tvShowName,
        userId: 1
      })
    }
    const response = await fetch("/api/addUpdateTVShows", data);
    return await response.json();
  }

  async function handleDeleteClick(tvShowId){
    let data = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tvShowId: tvShowId,
        userId: 1
      })
    }
    const response = await fetch("/api/deleteTVShows", data);
    return await response.json();
  }

  function handleSeasonClick(seasonId){
    let filteredSeasonList = seasonList.filter(s => s.season === seasonId);
    setEpisodeList(filteredSeasonList.map(s => {
      return s.episodes;
    }));
  }

  if(list.length){
    return (
      <>
        <div>
          <Shelf tvShows={list} onViewEpisodesClick={handleViewEpisodesClick} onAddClick={handleAddClick} onDeleteClick={handleDeleteClick}/>
        </div>
        {seasonList.map(season => (
          <input key={season.season} type="button" className="season" value={"Season " + season.season} onClick={e => {
            handleSeasonClick(season.season);
          }}/>
        ))}
        <Episodes episodeList={episodeList} tvShowId={TVShowID}></Episodes>
      </>
    );
  }
};