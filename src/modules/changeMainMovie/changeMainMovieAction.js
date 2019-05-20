const changeMainMovie = movies => dispatch => dispatch({ type: 'GET_MAIN_MOVIES_DETAILS', payload: { ...movies } });


export default changeMainMovie;
