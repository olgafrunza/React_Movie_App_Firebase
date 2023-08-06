import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext({ movies: [], setMovies: () => {} });

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const baseUrl = "https://api.themoviedb.org/3";
  const movieUrl = `${baseUrl}/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;

  useEffect(() => {
    fetchMovies(movieUrl);
    // eslint-disable-next-line
  }, []);

  const fetchMovies = async (url) => {
    const res = await axios.get(url);
    setMovies(res.data.results);
  };

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => {
  const context = useContext(MovieContext);
  return context;
};
