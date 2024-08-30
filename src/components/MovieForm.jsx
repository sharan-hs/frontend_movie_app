import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addMovie, updateMovie } from "../redux/moviesSlice";

const MovieForm = () => {
  const location = useLocation();

  const id = useParams().movieId;

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    if (id) {
      setTitle(location.state.movieTitle);
      setDirector(location.state.director);
      setGenre(location.state.genre);
    }
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formHandler = (e) => {
    e.preventDefault();
    const movieObj = {
      movieTitle: title,
      director: director,
      genre: genre,
    };

    if (!id) {
      dispatch(addMovie(movieObj));
    } else {
      dispatch(updateMovie({ id, movieObj }));
    }
    navigate("/");
  };
  return (
    <div className="bg-[#1F7A8C] w-screen h-screen">
      <p className="text-center text-white py-4 text-2xl">
        {id ? "Edit Movie" : "Add Movie"}
      </p>
      <form
        className="bg-[#E1E5F2] w-[80vw] mx-auto my-24 rounded-xl"
        onSubmit={formHandler}
      >
        <label className="m-4 text-[#1F7A8C] text-xl">Movie Title: </label>
        <input
          type="text"
          required
          value={title}
          className="w-[300px] rounded-sm m-4 bg-white py-2 px-2"
          placeholder="Movie Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <label className="m-4 text-[#1F7A8C] text-xl"> Director: </label>
        <input
          type="text"
          required
          value={director}
          placeholder="Director Name"
          className="w-[300px] rounded-sm my-4 mx-10 bg-white py-2 px-2"
          onChange={(e) => setDirector(e.target.value)}
        />
        <br />

        <label className="m-4 text-[#1F7A8C] text-xl"> Genre: </label>
        <input
          type="text"
          required
          value={genre}
          className="w-[300px] rounded-sm my-4 mx-14 bg-white py-2 px-2"
          placeholder="Genre"
          onChange={(e) => setGenre(e.target.value)}
        />
        <br />
        <button
          type="submit"
          className="bg-[#1F7A8C]  cursor-pointer text-white rounded-lg py-2 px-10 m-4 mt-12"
        >
          {id ? "Save Edit" : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
