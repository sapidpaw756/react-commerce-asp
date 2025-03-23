import React from 'react'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Navbar from './assets/components/Navbar';
import {Provider} from 'react-redux';
import { store } from './App/Store';

function App() {
  return( 
    <Provider store={store}>
      <BrowserRouter >
        <Navbar/>
        <Routes>
          <Route path="/react-commerce-asp/" element={<Home/>} />
          <Route path="/react-commerce-asp/product/:id" element={<ProductDetails/>} />
          <Route path="/react-commerce-asp/cart" element={<CartPage/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App
