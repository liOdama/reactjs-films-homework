const getTopRated = (state = { page: 0, results: [] }, action) => {
  switch (action.type) {
    case 'FETCH_COMING_SOON':
      return action.genres;
    default:
      return state;
  }
};

export default getTopRated;
