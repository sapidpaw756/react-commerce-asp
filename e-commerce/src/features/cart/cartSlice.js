import { createSlice } from '@reduxjs/toolkit';
import { useMemo } from 'react';

let initialState = {
    items: [],
}


if (!initialState.items.length) {
    initialState.items = JSON.parse(localStorage.getItem("cartItems")); 
    if(initialState.items != null){
        initialState.items = initialState.items.filter((prod) => prod.quantity > 0);
    }
    else{
        initialState.items = [];
    }
} 


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart : (state, action) =>{
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if(existingItem){
                existingItem.quantity += 1;
            }else{
                state.items.push({ ...action.payload, quantity: 1});
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        //Remove Cart
        removeFromCart: (state, action) =>{
            state.items = state.items.filter((item) => item.id !== action.payload);
            if(state.items.length === 0){
                localStorage.removeItem("cartItems");
            }
        },
        //update
        updateQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);

            if(item){
                item.quantity = action.payload.quantity;
            }
        }
    }

})

export const {addToCart, removeFromCart, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer