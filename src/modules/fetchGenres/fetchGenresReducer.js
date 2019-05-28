const initialState = [];


const fetchGenresReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ID_GENRES':
      return action.payload.genres;
    default:
      return state;
  }
};

export default fetchGenresReducer;
