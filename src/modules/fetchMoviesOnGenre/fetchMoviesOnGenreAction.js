const fetchMoviesOnGenre = id => dispatch => fetch(`https://api.themoviedb.org/3/discover/movie?api_key=75331f1a740385460b25b56203149aa8&with_genres=${id}`)
  .then(resp => resp.json())
  .then(data => dispatch({ type: 'FETCH_MOVIES_ON_GENRE', payload: { page: data.page, results: data.results } }));


export default fetchMoviesOnGenre;
