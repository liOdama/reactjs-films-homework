const initialState = [];


const fetchGenres = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ID_GENRES':
      return action.payload.genres;
    default:
      return state;
  }
};

export default fetchGenres;
