import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/moviesSlice";
import MovieList from "./MovieList";

import { Link } from "react-router-dom";

const MovieView = () => {
  const dispatch = useDispatch();
  const { movies, status, error } = useSelector((store) => store.movie);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  useEffect(() => {}, [movies]);

  return (
    <div>
      {status === "Loading" && (
        <p className="text-white text-center text-3xl">Loading....</p>
      )}
      {error && <p>Error occurred fetching Movies</p>}
      {movies && <MovieList movies={movies} />}
      <Link to="/addMovie">
        <button
          type="submit"
          className="bg-white  cursor-pointer text-[#1F7A8C] rounded-lg py-2 px-10 mx-32 my-6"
        >
          Add Movie
        </button>
      </Link>
    </div>
  );
};

export default MovieView;
