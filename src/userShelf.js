export function TVShow({ props }) {
    return (
      <>
        <div>
          <img alt={props.name} src={props.imageSrc} width="80px"></img>
        </div>
        <div>
          Title: {props.name}
        </div>
      </>
    );
}

export default function UserShelf({ tvShows, onViewEpisodesClick, onDeleteClick }) {
  return(
    <>
      {tvShows.map(tvShow => (
        <div key={tvShow.id} className="tvShow">
          <TVShow props={tvShow}></TVShow>
          <input type="button" value="View Episodes" onClick={e =>{
            onViewEpisodesClick(tvShow.id);
          }}/>
          <input type="button" value="Delete" onClick={e =>{
            onDeleteClick(tvShow.id);
          }}/>
        </div>
      ))}
    </>
  )
};