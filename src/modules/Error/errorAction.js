const TypeError = (dispatch, err) => {
  console.log('err123', err);
  return dispatch({
    type: 'ITEMS_HAS_ERRORED',
    payload: err,
  });
};

export default TypeError;
