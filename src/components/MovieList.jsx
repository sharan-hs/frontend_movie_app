import React from "react";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../redux/moviesSlice";
import { useNavigate } from "react-router-dom";

const MovieList = ({ movies }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteMovieHandler = (movieId) => {
    dispatch(deleteMovie(movieId));
  };
  const updateMovieHandler = (movieId) => {
    navigate(`/editMovie/${movieId}`, {
      state: movies.find((item) => item._id === movieId),
    });
  };
  return (
    <div>
      <p className="text-center py-4 text-[#FFFFFF] text-3xl">Movie List</p>
      {movies?.map((movie) => (
        <div
          key={movie?._id}
          className="bg-[#E1E5F2] overflow-x-hidden flex justify-between px-4 rounded-lg w-[1200px] h-[150px] mx-auto mt-4"
        >
          <div>
            <p className="text-2xl py-2">Title: {movie?.movieTitle}</p>
            <p className="text-2xl py-2">Director: {movie?.director}</p>
            <p className="text-2xl py-2">Genre: {movie?.genre}</p>
          </div>
          <div className="flex items-center justify-evenly  w-[40%]">
            <button
              onClick={() => updateMovieHandler(movie?._id)}
              className="bg-[#1F7A8C]  cursor-pointer text-white rounded-lg py-2 px-10"
            >
              Edit
            </button>
            <button
              onClick={() => deleteMovieHandler(movie?._id)}
              className="bg-white  cursor-pointer text-[#1F7A8C] rounded-lg py-2 px-10 my-auto"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
