const fetchGenres = () => dispatch => fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=75331f1a740385460b25b56203149aa8&language=en-US')
  .then(resp => resp.json())
  .then(data => dispatch({ type: 'FETCH_ID_GENRES', payload: { genres: data.genres } }));


export default fetchGenres;
