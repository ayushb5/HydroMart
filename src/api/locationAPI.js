import axios from "axios";

const API = axios.create({
  baseURL: "https://api.countrystatecity.in/v1",
  headers: {
    "X-CSCAPI-KEY": "YOUR API KEY",
  },
});

export const getStates = () => API.get("/countries/IN/states");
export const getCities = (stateCode) =>
  API.get(`/countries/IN/states/${stateCode}/cities`);
