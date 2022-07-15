import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5001/fir-dd55f/us-central1/api",
});

//  "http://localhost:5001/fir-dd55f/us-central1/api",   // development Link localhost swap
//  "https://us-central1-fir-dd55f.cloudfunctions.net/api"  // Live basae link
