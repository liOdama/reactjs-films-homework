const typeViewReducer = (state = 'cards', action) => {
  switch (action.type) {
    case 'SET_TYPE_VIEW':
      return action.payload;

    default:
      return state;
  }
};

export default typeViewReducer;
