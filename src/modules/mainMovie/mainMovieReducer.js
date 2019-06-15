const initialState = {};

const mainMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MAIN_MOVIE_DETAILS':
      return {
        ...action.payload
      };
    case 'CLEAR_RESULTS':
      return initialState;
    default:
      return state;
  }
};

export default mainMovieReducer;
