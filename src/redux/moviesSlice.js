import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../utils/helper";

export const fetchMovies = createAsyncThunk("/fetchMovies", async () => {
  const response = await fetch(`${BACKEND_URL}/movies`);
  const data = await response.json();
  return data;
});

export const addMovie = createAsyncThunk("/movies/add", async (movieObj) => {
  const response = await fetch(`${BACKEND_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(movieObj),
  });
  const data = await response.json();

  return data.movie;
});

export const updateMovie = createAsyncThunk(
  "/movies/update",
  async ({ id, movieObj }) => {
    const response = await fetch(`${BACKEND_URL}/movies/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(movieObj),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteMovie = createAsyncThunk(
  "/movies/delete",
  async (movieId) => {
    const response = await fetch(`${BACKEND_URL}/movies/${movieId}`, {
      method: "DELETE",
    });
    const data = await response.json();

    return data.movie;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = "Success";
      state.movies = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.error = "Error occurred fetching Movies";
    });
    builder.addCase(addMovie.fulfilled, (state, action) => {
      state.status = "Success";
      state.movies = [...state.movies, action.payload];
    });
    builder.addCase(updateMovie.fulfilled, (state, action) => {
      state.status = "Success";
      const updatedMovie = action.payload;

      state.movies = state.movies.map((movie) =>
        movie._id === updatedMovie._id ? updatedMovie : movie
      );
    });
    builder.addCase(deleteMovie.fulfilled, (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie._id !== action.payload._id
      );
    });
  },
});

export default moviesSlice.reducer;
