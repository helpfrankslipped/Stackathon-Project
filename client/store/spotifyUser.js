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
      //console.log(userInfo);
      const { data: token } = await axios.get("/token");
      console.log(token);
      process.env.TOKEN = token;
      dispatch(showUser(userInfo));
      //console.log("thunk token", process.env.TOKEN);
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
