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

export default function Shelf({ tvShows, onAddClick }) {
  return(
    <>
      {tvShows.map(tvShow => (
        <div key={tvShow.id} className="tvShow">
          <TVShow props={tvShow}></TVShow>
          <input type="button" value="Add" onClick={e =>{
            onAddClick(tvShow.id, tvShow.name);
          }}/>
        </div>
      ))}
    </>
  )
};