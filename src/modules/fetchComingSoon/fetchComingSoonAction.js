const fetchComingSoon = () => dispatch => fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=75331f1a740385460b25b56203149aa8&language=en-US&page=1')
  .then(resp => resp.json())
  .then(data => dispatch({ type: 'FETCH_COMING_SOON', payload: { page: data.page, results: data.results } }));


export default fetchComingSoon;
