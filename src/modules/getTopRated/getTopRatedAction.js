const getTopRated = () => dispatch => fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1')
  .then(resp => resp.json())
  .then(data => dispatch({ type: 'FETCH_TOP_RATED', payload: { page: data.page, results: data.results } }));


export default getTopRated;
