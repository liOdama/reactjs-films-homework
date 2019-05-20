const initialState = {
  page: 0,
  results: [],
  mainMovie: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_ON_GENRE':
      return {
        page: action.payload.page,
        results: action.payload.results,
        mainMovie: action.payload.results[0],
      };
    case 'FETCH_COMING_SOON':
      return {
        page: action.payload.page,
        results: action.payload.results,
        mainMovie: action.payload.results[0],
      };
    case 'FETCH_TOP_RATED':
      return {
        page: action.payload.page,
        results: action.payload.results,
        mainMovie: action.payload.results[0],
      };
    case 'FETCH_POPULAR':
      return {
        page: action.payload.page,
        results: action.payload.results,
        mainMovie: action.payload.results[0],
      };
    case 'GET_MAIN_MOVIES_DETAILS':
      return {
        ...state,
        mainMovie: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;

export { initialState };
