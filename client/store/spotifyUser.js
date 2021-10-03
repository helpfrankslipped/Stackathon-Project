import axios from "axios";

const SHOW_USER = "SHOW_USER";

const showUser = (user) => {
  return {
    type: SHOW_USER,
    user,
  };
};

//thunk

const fetchUser = () => {
  return async (dispatch) => {
    try {
      const { data: userInfo } = await axios.get("/user");
      //console.log("thunk user info", userInfo);
      dispatch(showUser(userInfo));
    } catch (error) {
      return `error ${error.message}`;
    }
  };
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_USER:
      return action.user;
    default:
      return state;
  }
};

export { fetchUser };
export default userReducer;
