import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../redux/moviesSlice";
export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});
