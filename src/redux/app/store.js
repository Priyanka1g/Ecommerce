import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import { api } from "../features/apiSlice";
export const store = configureStore({
    reducer:{
        cart:cartSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export const { useGetProductsQuery } = api;