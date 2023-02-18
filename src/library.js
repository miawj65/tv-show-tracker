import { tvShows } from './data.js';
import './App.css';
import { useState } from 'react';

let nextId = 6;

export function Description({ description }) {
  return (
    <div>
      {description}
    </div>
  );
}

export function TVShow({ props }) {
    return (
      <div>
        Title: {props.name}
      </div>
    );
}

export function Shelf({ tvShows, onToggle, onDescriptionClick, onDeleteClick }) {
  return(
    <>
      {tvShows.map(tvShow => (
        <div key={tvShow.id} className='tvShow'>
          <TVShow props={tvShow}></TVShow>
          <button onClick={e => {
            onDescriptionClick(tvShow.id, !tvShow.descriptionShowing);
          }}>
            {tvShow.descriptionShowing ? "Hide" : "Show"} Description
          </button>
          {tvShow.descriptionShowing && <Description description={tvShow.description}/>}
          <div>
            Watched: 
            <input type="checkbox" checked={tvShow.watched} onChange={e => {
              onToggle(tvShow.id, e.target.checked);
            }}/>
          </div>
          <input type="button" value="Delete" onClick={e =>{
            onDeleteClick(tvShow.id);
          }}/>
        </div>
      ))}
    </>
  )
};

export default function Library() {
  const [list, setList] = useState(tvShows);
  const [name, setName] = useState("");

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

  if(list){
    return (
      <>
        <div className='shelf'>
          <Shelf tvShows={list} onToggle={handleToggle} onDescriptionClick={handleDescriptionClick} onDeleteClick={handleDeleteClick}/>
        </div>
        <label>Name</label>
        <input type="text" onChange={e => setName(e.target.value)}/>
        <input type="button" value="Add" onClick={() =>{
          setList([
            ...list,
            {id: nextId++, name: name}
          ]);
        }}/>
      </>
    );
  }
};