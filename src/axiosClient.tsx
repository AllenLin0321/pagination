import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "content-type": "application/json",
  },
});

export default axiosClient;
