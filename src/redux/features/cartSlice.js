import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    carts:[]
}

const cartSlice= createSlice({
    name:'cartslice',
    initialState,
    reducers:{
        addToCart:(state, action)=>{
            // console.log("action", action)

            // in this we are not handling quantity 
            // state.carts = [...state.carts, action.payload]
            // console.log(state.carts)

            const itemIndex = state.carts.findIndex((item)=>item.id===action.payload.id)
            if(itemIndex>=0){
                state.carts[itemIndex].qty++
            }
            else{
                const quantity = {...action.payload, qty:1}
                state.carts =[...state.carts, quantity]
            }
        },
        removeToCart:(state, action)=>{
            const data = state.carts.filter((ele)=>ele.id!==action.payload)
            state.carts = data;
        },
        removeSingle:(state, action)=>{
            const itemIndex = state.carts.findIndex((item)=>item.id===action.payload)
            if(state.carts[itemIndex].qty>=1){
                state.carts[itemIndex].qty--;
            }
        },
        clearCart:(state, action)=>{
            state.carts=[]
        }
    }
})

export const {addToCart, clearCart} = cartSlice.actions
export const {removeToCart} = cartSlice.actions
export const {removeSingle} = cartSlice.actions

export default cartSlice.reducer