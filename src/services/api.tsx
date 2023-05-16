import axios from "axios";

//const baseUrl = process.env.REACT_APP_BASE_URL_API;
const baseUrl = "http://localhost:3000/";

const api = axios.create({
  baseURL: baseUrl,
});

export default api;
