const changeMainMovie = movies => dispatch => dispatch({ type: 'CHANGE_MAIN_MOVIE', payload: { ...movies } });


export default changeMainMovie;
