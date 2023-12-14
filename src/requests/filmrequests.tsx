import axios from "axios";
import { apiUrl } from "./apiConfig";

export type FilmType = {
  first_air_date: string;
  vote_average: string;
  release_date: string;
  id: number;
  title: string;
  filmType: string;
  poster_path: string;
  original_name: string;
  name: string;
};

export const getFilms = async () => {
  const options = {
    method: "GET",
    url: `${apiUrl}trending/all/day?language=en-US&api_key=ae304e3f4d3830d95075ae6914b55ddf`,
  };

  try {
    const response = await axios(options);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTopFilms = async () => {
  const options = {
    method: "GET",
    url: `${apiUrl}movie/top_rated?language=en-US&page=1&api_key=ae304e3f4d3830d95075ae6914b55ddf`,
  };

  try {
    const response = await axios(options);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetFilmsBySearch = async (key: string) => {
  const options = {
    method: "GET",
    url: `${apiUrl}/search/movie?query=${key}&include_adult=false&language=en-US&page=1&api_key=ae304e3f4d3830d95075ae6914b55ddf`,
  };

  try {
    const response = await axios(options);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetFilmById = async (id: string | undefined) => {
  const options = {
    method: "GET",
    url: `${apiUrl}movie/${id}?language=en-US&api_key=ae304e3f4d3830d95075ae6914b55ddf`,
  };

  try {
    const response = await axios(options);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetFilmImageId = async (id: string | undefined) => {
  const options = {
    method: "GET",
    url: `${apiUrl}movie/${id}/images?api_key=ae304e3f4d3830d95075ae6914b55ddf`,
  };

  try {
    const response = await axios(options);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetTrFilms = async () => {
  const options = {
    method: "GET",
    url: `${apiUrl}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=TR&page=1&api_key=ae304e3f4d3830d95075ae6914b55ddf`,
  };

  try {
    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetEnFilms = async () => {
  const options = {
    method: "GET",
    url: `${apiUrl}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=US&page=1&api_key=ae304e3f4d3830d95075ae6914b55ddf`,
  };

  try {
    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
