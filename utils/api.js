import { stringify } from "postcss";
import { API_URL } from "./urls";

const STRAPI_API_TOKEN = "88fd8b908762dab69e5f7b9d04baba7031b45e33227206cae58677759a021be79a5f59d397418421928771d4eec8cba4c38e0520c8a09bfd146f208e1447151072cce57d16d72da4e9f7e3c94e874fc6d9caf01a45e40b7a07b299a944a9b31c5f5ee7cf5fd676c41bf76401f86b261e16746bd332b840d23848f14f01e1d7bc"

export const fetchDataFromApi = async (endpoint) =>{
    const options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + STRAPI_API_TOKEN   
        }
      };

      const res = await fetch(`${API_URL}${endpoint}` , options);
      const data = await res.json();

      return data;     
}

export const makePayementRequest = async (endpoint , payload) => {
  const res = await fetch(`${API_URL}${endpoint}` , {
    method : "POST",
    headers : {
      Authorization : "Bearer " + STRAPI_API_TOKEN,
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(payload)
  });
  const data  = await res.json();
  return data
}