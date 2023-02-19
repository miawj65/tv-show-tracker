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

export default function Shelf({ tvShows, onViewEpisodesClick, onAddClick, onDeleteClick }) {
  return(
    <>
      {tvShows.map(tvShow => (
        <div key={tvShow.id} className="tvShow">
          <TVShow props={tvShow}></TVShow>
          <input type="button" value="View Episodes" onClick={e =>{
            onViewEpisodesClick(tvShow.id);
          }}/>
          <input type="button" value="Add" onClick={e =>{
            onAddClick(tvShow.id, tvShow.name);
          }}/>
          <input type="button" value="Delete" onClick={e =>{
            onDeleteClick(tvShow.id);
          }}/>
        </div>
      ))}
    </>
  )
};