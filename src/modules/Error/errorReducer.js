const errorReducer = (state = '', action) => {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.payload;

    default:
      return state;
  }
};

export default errorReducer;
