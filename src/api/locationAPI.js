import axios from "axios";

const API = axios.create({
  baseURL: "https://api.countrystatecity.in/v1",
  headers: {
    "X-CSCAPI-KEY":
      "ece7446239c8d39919e176d2e42a9072ae7d4b5f4c48c9fb30de2be70f811e7d",
  },
});

export const getStates = () => API.get("/countries/IN/states");
export const getCities = (stateCode) =>
  API.get(`/countries/IN/states/${stateCode}/cities`);
