const userDeletedReducer = (state = false, action) => {
  switch (action.type) {
    case "DELETED":
      return !state;
    default:
      return state;
  }
};

export default userDeletedReducer;
