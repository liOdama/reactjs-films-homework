export const itemsHasErrored = err => ({
  type: 'ITEMS_HAS_ERRORED',
  hasErrored: err,
});

export const itemsIsLoading = bool => ({
  type: 'ITEMS_IS_LOADING',
  isLoading: bool,
});
