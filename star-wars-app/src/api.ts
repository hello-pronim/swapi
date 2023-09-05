import axios from "axios";

const SWAPI_BASE_URL = "https://swapi.dev/api";

export const fetchCharacters = async (page: number, searchTerm?: string) => {
  const url = `${SWAPI_BASE_URL}/people/?page=${page}&search=${
    searchTerm || ""
  }`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchCharacter = async (id: number) => {
  const url = `${SWAPI_BASE_URL}/people/${id}`;
  const response = await axios.get(url);
  return response.data;
};
