const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4e5bccb8efmsh37c75a614a9cc7dp17280ajsna67a17f828c7',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
};

export async function getTVShows(searchParam) {
    const url = 'https://imdb8.p.rapidapi.com/title/v2/find?title=';
    if(searchParam === "") return [];
    let searchUrl = url + searchParam + "&titleType=tvSeries";
    const response = await fetch(searchUrl, options);
    return await response.json();
}

export async function getTVShowEpisodes(tvShowId) {
    const url = 'https://imdb8.p.rapidapi.com/title/get-seasons?tconst=';
    if(tvShowId === "") return [];
    let searchUrl = url + tvShowId;
    const response = await fetch(searchUrl, options);
    return await response.json();
}