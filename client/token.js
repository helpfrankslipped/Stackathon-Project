import axios from "axios";

const getToken = async () => {
  try {
    const { data: token } = await axios.get("/token");
    return token;
  } catch (error) {
    return `Error ${error} in getToken`;
  }
};

const getUserId = async () => {
  try {
    const { data: userInfo } = await axios.get("/user");
    return userInfo.user.id;
  } catch (error) {
    return `Error ${error} in get user id`;
  }
};

export { getUserId };
export default getToken;
