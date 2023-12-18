import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 500000,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    topUp(state, action) {
      const { amount } = action.payload;
      if (amount) {
        state.balance += amount;
      }
    },
    withDraw(state, action) {
      const { amount } = action.payload;
      if (amount) {
        state.balance -= amount;
      }
    },
    refund(state, action) {
      const { amount } = action.payload;
      if (amount) {
        state.balance += amount;
      }
    },
  },
});

export const { topUp, withDraw, refund } = balanceSlice.actions;

export default balanceSlice.reducer;
