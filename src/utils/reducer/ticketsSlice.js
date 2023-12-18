import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(movieId, name, movie, selectedSeats, totalPrice) {
        return {
          payload: {
            id: nanoid(),
            movieId,
            name,
            movie,
            selectedSeats,
            totalPrice,
            status: "pending",
          },
        };
      },
    },
    cancel(state, action) {
      const { id } = action.payload;
      const existingTicket = state.find((item) => item.id === id);
      if (existingTicket) {
        state.splice(
          state.findIndex((item) => item.id === id),
          1
        );
      }
    },
    updateStatus(state, action) {
      const { id } = action.payload;
      const existingTicket = state.find((item) => item.id === id);
      const success = "success";
      if (existingTicket) {
        existingTicket.status = success;
      }
    },
  },
});

export const { addTicket, cancel, updateStatus } = ticketsSlice.actions;

export default ticketsSlice.reducer;
