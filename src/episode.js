export default function Episodes({ episodeList, tvShowId, onWatchedUpdated }){
  
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
        await fetch("/api/addUpdateEpisodes", data).then(response => 
          response.json().then(data => ({
            data: data,
            status: response.status
          })
          ).then(() => {
            onWatchedUpdated(episodeId, episodeName, isWatched);
        }));
      }
      else{
        await fetch("/api/deleteEpisodes", data).then(response =>
          response.json().then(data => ({
            data: data,
            status: response.status
          })
          ).then(() => {
            onWatchedUpdated(episodeId, episodeName, isWatched);
        }));
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
                <input type="checkbox" checked={episode.watched} onChange={e => {
                  handleToggle(episode.id.replace("title", "").replaceAll("/", ""), episode.title, e.target.checked);
                }}/>
              </div>
            </div>
          ))};
        </>
      );
    }
  }