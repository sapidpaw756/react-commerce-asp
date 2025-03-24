import React from 'react'
import ProductGrid from '../assets/components/ProductGrid';
import Footer from '../assets/components/Footer';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../features/products/ProductSlice';
import logo from '../assets/imgs/GPU/Asus ProArt GeForce RTX 4070.jpg';
import logo1 from '../assets/imgs/GPU/GeForce RTX 5080.jpg';
import logo2 from '../assets/imgs/GPU/GeForce RTX 5090.jpg';
import logo3 from '../assets/imgs/Laptops/Legion 7i 16inch Gen 9 - Eclipse Black.jpg';

const categories =[
  "All",
  "Graphics Cards",
  "Laptop",
  "Monitors",
  "Power Supply"
];

function Home() {
  const dispatch = useDispatch();

  return (
    <div>
      <div className='bg'></div>
      <div className='container mx-auto my-10 px-4'>
        <div className='flex gap-4 flex-wrap'>
          {categories.map((cat) => {
            return (
              <button className='bg-gray-300 py-2 px-4 rounded-md text-black active:scale-105 hover:bg-zinc-400 transition-all ease-in' key={cat} onClick={()=> dispatch(setSelectedCategory(cat))}>{cat}</button>
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
