import axios from "axios";
const API_URL = "https://api.themoviedb.org/3";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const getTrending = async () => {
  try {
    const timeWindow = "day";
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${apiKey}`
    );

    return response.data.results;
  } catch (error) {
    console.error("API Error: ", error);
    throw new Error("Failed to fetch data");
  }
};

export const getRated = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
    );

    return response.data.results;
  } catch (error) {
    console.error("API Error: ", error);
    throw new Error("Failed to fetch data");
  }
};

export const getPopular = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    console.error("API Error: ", error);
    throw new Error("Failed to fetch data");
  }
};

export const getUpcoming = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
    );
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("API Error: ", error);
    throw new Error("Failed to fetch data");
  }
};

export const getPopularPeople = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`
    );
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("API Error: ", error);
    throw new Error("Failed to fetch data");
  }
};

export const getMoviePopularDetails = async (movieId) => {
  const movieDetailsResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
  );
  const movieCastResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
  );

  return {
    ...movieDetailsResponse.data,
    cast: movieCastResponse.data.cast,
  };
};

export const handleSearch = async (query) => {
  try {
    const response = await axios.get(
      `${API_URL}/search/movie?api_key=${apiKey}&query=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error("API Error: ", error);
    throw new Error("Failed to fetch data");
  }
};
