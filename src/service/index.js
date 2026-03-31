import axios from "axios";
const API_URL = "https://api.themoviedb.org/3";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const apiGet = async (path) => {
  try {
    const response = await axios.get(`${API_URL}${path}?api_key=${apiKey}`);
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getTrending = () => apiGet("/trending/movie/day");
export const getRated = () => apiGet("/movie/top_rated");
export const getPopular = () => apiGet("/movie/popular");
export const getUpcoming = () => apiGet("/movie/upcoming");
export const getPopularPeople = () => apiGet("/person/popular");

export const getMoviePopularDetails = async (movieId) => {
  const [movieDetails, movieCast, movieVideos] = await Promise.all([
    axios.get(`${API_URL}/movie/${movieId}?api_key=${apiKey}`),
    axios.get(`${API_URL}/movie/${movieId}/credits?api_key=${apiKey}`),
    axios.get(`${API_URL}/movie/${movieId}/videos?api_key=${apiKey}`),
  ]);

  return {
    ...movieDetails.data,
    cast: movieCast.data.cast,
    videos: movieVideos.data.results,
  };
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await axios.get(
      `${API_URL}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const handleSearch = async (query) => {
  try {
    const response = await axios.get(
      `${API_URL}/search/movie?api_key=${apiKey}&query=${query}`
    );
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
