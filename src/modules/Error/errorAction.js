const itemsReducer = err => ({
  type: 'ITEMS_HAS_ERRORED',
  payload: err,
});

export default itemsReducer;
