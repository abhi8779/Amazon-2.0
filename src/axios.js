import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5001/fir-dd55f/us-central1/api", // The Api url(cloud function)
});
// http://localhost:5001/fir-dd55f/us-central1/api
