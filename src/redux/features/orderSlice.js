import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    orders:[]
}

const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{
        addToOrders: ()=>{

        },
        deleteToOrders:()=>{
            
        }
    }
})

export const {addToOrders} = orderSlice.actions
export default orderSlice.reducer
