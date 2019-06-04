export const itemsHasErrored = err => ({
  type: 'ITEMS_HAS_ERRORED',
  payload: err,
});

export const itemsIsLoading = bool => ({
  type: 'ITEMS_IS_LOADING',
  payload: bool,
});
