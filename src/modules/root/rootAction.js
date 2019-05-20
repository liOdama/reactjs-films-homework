const fetchPopular = () => dispatch => fetch('https://api.themoviedb.org/3/movie/popular?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1')
  .then(resp => resp.json())
  .then(data => dispatch({ type: 'FETCH_POPULAR', payload: { page: data.page, results: data.results } }));


export default fetchPopular;
