import { useState, useEffect } from "react";
import "./App.css";
import Shelf from "./shelf.js";

export default function UserLibrary(tvShowList) {
  const [list, setList] = useState([]);
  const [userId, setUserId] = useState(0);

  useEffect(() => { 
    setList(tvShowList.tvShows)
  }, [tvShowList.tvShows] );

  useEffect(() => { 
    setUserId(tvShowList.currentUserId)
  }, [tvShowList.currentUserId] );

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
        userId: userId
      })
    }
    const response = await fetch("/api/addUpdateTVShows", data);
    return await response.json();
  }

  if(list.length){
    return (
      <div>
        <Shelf tvShows={list} onAddClick={handleAddClick}/>
      </div>
    );
  }
};