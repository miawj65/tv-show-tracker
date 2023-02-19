import { useState, useEffect } from "react";
import "./App.css";
import { getTVShowEpisodes } from "./tvShowService.js";
import Episodes from "./episode.js";
import UserShelf from "./userShelf.js";

export default function Library(tvShowList) {
  const [list, setList] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [episodeList, setEpisodeList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [TVShowID, setTVShowID] = useState("");
  const [userId, setUserId] = useState(0);

  useEffect(() => { 
    setList(tvShowList.tvShows)
  }, [tvShowList.tvShows] );

  useEffect(() => { 
    setUserId(tvShowList.currentUserId)
  }, [tvShowList.currentUserId] );

  async function handleViewEpisodesClick(tvShowId){
    setTVShowID(tvShowId);
    getTVShowEpisodes(tvShowId)
    .then(seasons => {
      setSeasonList(seasons);
      setEpisodeList([]);
    });

    let data = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tvShowId: tvShowId,
        userId: userId
      })
    }

    await fetch("/api/getEpisodes", data).then(response => 
      response.json().then(data => ({
          data: data,
          status: response.status
      })
    ).then(res => {
      let parsedData = JSON.parse(res.data.recordset[0].Episodes);
      if(!parsedData) return;
      setWatchedList(parsedData.map(data => {
        return {
          id: data.EpisodeID,
          name: data.Name
        };
      }));
    }));
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
        userId: userId
      })
    }
    const response = await fetch("/api/deleteTVShows", data);
    return await response.json();
  }

  function handleSeasonClick(seasonId){
    let filteredSeasonList = seasonList.filter(s => s.season === seasonId);
    setEpisodeList(filteredSeasonList.map(s => {
      return s.episodes.map(e => {
        let watched = (watchedList.filter(w => w.id === e.id.replace("title", "").replaceAll("/", "")).length > 0);
        return {
          id: e.id.replace("title", "").replaceAll("/", ""),
          title: e.title,
          watched: watched
        }
      });
    }));
  }

  function handleWatchedUpdated(episodeId, episodeName, isWatched){
    let updatedWatchedList = watchedList;
    if(isWatched){
      updatedWatchedList = [...watchedList, {id: episodeId, name: episodeName}];
    }
    else{
      updatedWatchedList = watchedList.filter(w => w.id !== episodeId);
    }
    setEpisodeList(episodeList.map(l => {
      return l.map(e => {
        let watched = (updatedWatchedList.filter(w => w.id === e.id).length > 0);
        return {
          id: e.id,
          title: e.title,
          watched: watched
        }
      });
    }));
    setWatchedList(updatedWatchedList);
  }

  if(list.length){
    return (
      <>
        <div>
          <UserShelf tvShows={list} onViewEpisodesClick={handleViewEpisodesClick} onDeleteClick={handleDeleteClick}/>
        </div>
        {seasonList.map(season => (
          <input key={season.season} type="button" className="season" value={"Season " + season.season} onClick={e => {
            handleSeasonClick(season.season);
          }}/>
        ))}
        <Episodes episodeList={episodeList} tvShowId={TVShowID} onWatchedUpdated={handleWatchedUpdated}></Episodes>
      </>
    );
  }
};