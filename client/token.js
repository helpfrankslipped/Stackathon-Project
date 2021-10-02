import axios from "axios";

const getToken = async () => {
  try {
    const { data: token } = await axios.get("/token");
    return token;
  } catch (error) {
    return `Error ${error} in getToken`;
  }
};

export default getToken;
