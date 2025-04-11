import React from 'react';
import logo from '../imgs/asp-logo.png';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../../features/products/ProductSlice';

function Footer() {
  const dispatch = useDispatch();
  const categories = [
    "Graphics Cards",
    "Laptop",
    "Monitors",
    "Power Supply"
  ];

  return (
    <footer className='bg-skin-red shadow-md'>
      {/* <div className='container mx-auto px-4'>
        <div className='min-h-6'>
          <div className='flex justify-between items-center flex-col md:flex-row py-10'>
            <h2 className='text-4xl font-bold text-white'>Subcribe Our Newsletter</h2>
            <form className='md:w-1/3 w-full mt-8 md:mt-0 relative'>
              <input type='text' placeholder='Enter your Email' className='p-4 rounded shadow-md w-full' />
              <button className='bg-gray-200 py-3 px-4 rounded-full absolute right-3 top-1'>Submit</button>
            </form>
          </div>
        </div>
      </div> */}
      <div className='bg-skin-light_red text-white py-8'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            <div>
              <img src={logo} className='my-4 h-6' />
              <div className='flex items-center gap-8 m-t-5'>
                <Link to='https://www.facebook.com/otaku.yopip' target='_blank'><Facebook size={40} className='bg-white  text-black rounded-md p-2 cursor-pointer' /></Link>
                <Link to='https://www.linkedin.com/in/alfie-patnugot-40975b151?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' target='_blank'><Linkedin size={40} className='bg-white  text-black rounded-md p-2 cursor-pointer' /></Link>
              </div>
            </div>
            <div>
              <h2 className='text-2xl font-semibold my-4'> Pages</h2>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/'>About</Link>
                </li>
                <li>
                  <Link to='/'>FAQs</Link>
                </li>
                <li>
                  <Link to='/'>Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='text-2xl font-semibold my-4'>Category</h2>
              <ul>
                {categories.map((cat) => {
                  return (
                    <li className="cursor-pointer" key={cat} onClick={() => dispatch(setSelectedCategory(cat))}>{cat}</li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h2 className='text-2xl font-semibold my-4'>Contact Us</h2>
              <p>San Francisco Heights Palo Alto, Calamba City, Laguna, Philippines</p>
              <p>+639454554697</p>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto text-center py-4 text-white'>
        <p>Copyright &copy; 2025 sapidpaw</p>
      </div>
    </footer>
  )
}

export default Footer
