import { initialState } from '../root/rootReducer';

const getTopRated = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TOP_RATED':
      return {
        page: action.payload.page,
        results: action.payload.results,
      };
    default:
      return state;
  }
};

export default getTopRated;
