import axios from "axios";

const api = axios.create({
  baseURL: "https://trackit-z090.onrender.com/",
});

export default api;
