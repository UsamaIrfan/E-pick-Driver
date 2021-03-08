const INITIAL_STATE = {
  currentUser: {name: "Mr. SAM", email: "someone@example.com", phone: "+923211234567", CNIC: "422011234567890", emailVerified: false},
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