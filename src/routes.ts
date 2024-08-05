// baseURL.js

export const URL = process.env.REACT_APP_API_URL;

const baseURL = {
  test: `${URL}/test`,
  auth: `${URL}/auth`,
  user: `${URL}/user`,
};

export default baseURL;
