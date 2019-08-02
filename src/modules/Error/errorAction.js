const TypeError = (dispatch, err) => dispatch({
  type: 'ITEMS_HAS_ERRORED',
  payload: err,
});

export default TypeError;
