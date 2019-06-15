export const itemsFetchDataSuccess = items => ({
  type: 'ITEMS_FETCH_DATA_SUCCESS',
  payload: items
});

export const fetchVideoSuccess = items => ({
  type: 'FETCH_VIDEO_SUCCESS',
  payload: items
});

export const clearResults = () => ({
  type: 'CLEAR_RESULTS',
  payload: []
});

export default itemsFetchDataSuccess;
