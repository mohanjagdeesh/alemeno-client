import axios from "axios";

const instance = axios.create({
  baseURL: "https://serveralemeno.onrender.com/",
});

export default instance;
