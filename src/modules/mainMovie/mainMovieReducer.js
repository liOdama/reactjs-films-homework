const initialState = {};

const mainMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MAIN_MOVIE_DETAILS':
      return {
        ...action.payload,
      };
    case 'CHANGE_MAIN_MOVIE':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default mainMovieReducer;
