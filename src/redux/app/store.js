import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import { api } from "../features/apiSlice";
import orderSlice from "../features/orderSlice";
import reviewSlice from "../features/reviewSlice";
import loginSlice from "../features/loginSlice";
import signupSlice from "../features/signupSlice";
export const store = configureStore({
    reducer: {
        cart: cartSlice,
        order: orderSlice,
        review:reviewSlice,
        login:loginSlice,
        signup:signupSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export const { useGetProductsQuery } = api;