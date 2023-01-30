import axios from "axios";
import { API } from "../utils/constants";

const client = axios.create({
  baseURL: API,
  timeout: 10000,
});

export default client;
