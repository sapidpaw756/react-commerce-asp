import React, { useEffect, useState } from 'react'
import ProductGrid from '../assets/components/ProductGrid';
import Footer from '../assets/components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../features/products/ProductSlice';
import Slider from '../assets/components/slider';
const categories =[
  "All",
  "Graphics Cards",
  "Laptop",
  "Monitors",
  "Power Supply"
];

function Home() {


  const dispatch = useDispatch();
  

  useEffect(() => {
    document.querySelectorAll('.cat-button').forEach(e => {
        e.addEventListener('click', (elem) =>
        { 
          document.querySelectorAll('.cat-button').forEach(x => {x.classList.remove('bg-red-500','text-white')});
          elem.target.classList.add('bg-red-500','text-white');
        }
      )});
  }, []);




  return (
    <div className='bg-skin-black'>
      <Slider />
      <div className='container mx-auto my-10 px-4'>
        <div className='flex gap-4 flex-wrap'>
          {categories.map((cat) => {
            return (
              <button className='bg-gray-100 cat-button py-2 px-4 rounded-md text-black active:scale-105 hover:bg-red-500 hover:text-white transition-all ease-in' key={cat} onClick={()=> dispatch(setSelectedCategory(cat))}>{cat}</button>
            );
          })}
        </div>

        <ProductGrid />
      </div>
      <Footer />
     
    </div>
  )
}

export default Home
