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
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/cart" element={<CartPage/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App
