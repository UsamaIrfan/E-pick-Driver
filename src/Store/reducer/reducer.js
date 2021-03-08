const INITIAL_STATE = {
  users: [{ email: "usama.irfan60@yahoo.com", password: 123456 }],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_DATA":
      console.log(action);
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};
