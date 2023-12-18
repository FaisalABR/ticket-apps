import { configureStore } from "@reduxjs/toolkit";

import movieSlice from "./reducer/movieSlice";
import seatSlice from "./reducer/seatsSlice";
import balanceSlice from "./reducer/balanceSlice";
import ticketsSlice from "./reducer/ticketsSlice";

export default configureStore({
  reducer: {
    seats: seatSlice,
    movies: movieSlice,
    balance: balanceSlice,
    tickets: ticketsSlice,
  },
});
