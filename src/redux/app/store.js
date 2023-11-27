import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import { api } from "../features/apiSlice";
import orderSlice from "../features/orderSlice";
import reviewSlice from "../features/reviewSlice";
export const store = configureStore({
    reducer: {
        cart: cartSlice,
        order: orderSlice,
        review:reviewSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export const { useGetProductsQuery } = api;