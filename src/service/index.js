import axios from "axios";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const getTrending = async () => {
  try {
    const timeWindow = "day";
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${apiKey}`
    );
    console.log(response.data.results);
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
    console.log(response.data.results);
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
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("API Error: ", error);
    throw new Error("Failed to fetch data");
  }
};
