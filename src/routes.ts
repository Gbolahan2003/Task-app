// baseURL.js

export const URL = process.env.REACT_APP_API_URL;
// export const URL ='http://localhost:8080'

const baseURL = {
  test: `${URL}/test`,
  auth: `${URL}/auth`,
  user: `${URL}/user`,
};

export default baseURL;
