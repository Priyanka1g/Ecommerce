import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToOrders: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addToOrders, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
