import { useState, useEffect } from 'react';
import './App.css';
//import tvShows from './data.js';
import { getTVShowEpisodes } from './tvShowService';

export function Description({ description }) {
  return (
    <div>
      {description}
    </div>
  );
}

export function TVShow({ props }) {
    return (
      <>
        <div>
          <img alt={props.title} src={props.imageSrc} width="80px"></img>
        </div>
        <div>
          Title: {props.name}
        </div>
      </>
    );
}

export function Shelf({ tvShows, onViewEpisodesClick, onToggle, onDescriptionClick, onDeleteClick }) {
  return(
    <>
      {tvShows.map(tvShow => (
        <div key={tvShow.id} className='tvShow'>
          <TVShow props={tvShow}></TVShow>
          <input type="button" value="View Episodes" onClick={e =>{
            onViewEpisodesClick(tvShow.id);
          }}/>
          {/* <button onClick={e => {
            onDescriptionClick(tvShow.id, !tvShow.descriptionShowing);
          }}>
            {tvShow.descriptionShowing ? "Hide" : "Show"} Description
          </button>
          {tvShow.descriptionShowing && <Description description={tvShow.description}/>} */}
          {/* <div>
            Watched: 
            <input type="checkbox" checked={tvShow.watched} onChange={e => {
              onToggle(tvShow.id, e.target.checked);
            }}/>
          </div> */}
          {/* <input type="button" value="Delete" onClick={e =>{
            onDeleteClick(tvShow.id);
          }}/> */}
        </div>
      ))}
    </>
  )
};

export default function Library(tvShowList) {
  const [list, setList] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [episodeList, setEpisodeList] = useState([]);

  useEffect(() => { 
    setList(tvShowList.tvShows)
  }, [tvShowList.tvShows] );

  function handleViewEpisodesClick(tvShowId){
    getTVShowEpisodes(tvShowId)
    .then(seasons => {
      setSeasonList(seasons);
    });
  }

  function handleDescriptionClick(tvShowId, isShowing) {
    setList(list.map(tvShow => {
      if(tvShow.id === tvShowId){
        return {...tvShow, descriptionShowing: isShowing};
      }
      else {
        return tvShow;
      }
    }));
  }

  function handleToggle(tvShowId, isWatched){
    setList(list.map(tvShow => {
      if(tvShow.id === tvShowId){
        return {...tvShow, watched: isWatched};
      }
      else {
        return tvShow;
      }
    }));
  }

  function handleDeleteClick(tvShowId){
    setList(list.filter(l => l.id !== tvShowId));
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
          <Shelf tvShows={list} onViewEpisodesClick={handleViewEpisodesClick} onToggle={handleToggle} onDescriptionClick={handleDescriptionClick} onDeleteClick={handleDeleteClick}/>
        </div>
        {seasonList.map(season => (
          <input key={season.season} type="button" className="season" value={"Season " + season.season} onClick={e => {
            handleSeasonClick(season.season);
          }}/>
        ))}
        <Episodes episodeList={episodeList}></Episodes>
      </>
    );
  }
};

export function Episodes({ episodeList }){
  if(episodeList.length){
    return(
      <>
        {episodeList[0].map(episode => (
          <div key={episode.id}>
            {episode.title}
          </div>
        ))};
      </>
    );
  }
}