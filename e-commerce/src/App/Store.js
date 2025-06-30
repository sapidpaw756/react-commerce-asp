import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../features/products/ProductSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/OrderSlice';

export const store = configureStore({
    reducer:{
        cart: cartReducer,
        product: productReducer,
        order: orderReducer,
    },
});