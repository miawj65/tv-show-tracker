export default function Episodes({ episodeList, tvShowId }){
  
    async function handleToggle(episodeId, episodeName, isWatched){
      let data = {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          episodeId: episodeId,
          name: episodeName,
          tvShowId: tvShowId,
          userId: 1
        })
      }
      if(isWatched){
        const response = await fetch("/api/addUpdateEpisodes", data);
        return await response.json();
      }
      else{
        const response = await fetch("/api/deleteEpisodes", data);
        return await response.json();
      }
    }
  
    if(episodeList.length){
      return(
        <>
          {episodeList[0].map(episode => (
            <div key={episode.id.replace("title", "").replaceAll("/", "")}>
              {episode.title}
              <div>
                Watched: 
                <input type="checkbox" onChange={e => {
                  handleToggle(episode.id.replace("title", "").replaceAll("/", ""), episode.title, e.target.checked);
                }}/>
              </div>
            </div>
          ))};
        </>
      );
    }
  }