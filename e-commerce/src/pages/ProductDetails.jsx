import { ShoppingCart } from 'lucide-react'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { addToCart } from '../features/cart/cartSlice';
import Footer from '../assets/components/Footer';
import { fetchTodo } from '../features/products/ProductSlice';


function ProductDetails() {

  const {id} = useParams();
  const dispatch = useDispatch();

   useEffect(()=>{
     dispatch(fetchTodo())
   },[])

  const product  = useSelector((state) => state.product.items.find((p) => p.id === id));

  
  if(!product){
    return <div className='container mx-auto px-4 py-8'>
      <div className='text-center'>
        <h2 className='text-2l font-bold mb-4'>Product Not Found</h2>
        <Link to="/" className='text-blue-600 hover:text-blue-800'>Return to Home</Link>
      </div>
    </div>
  }

  return (
    <div className='bg-skin-black'>
      <div className='container mx-auto px-4 py-8'>
        <div>
          <Link to='/' className='mb-8 text-white inline-block'>Back to Products</Link>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 items-center'>
            <div className='shadow-md p-4 rounded rounded w-100 lg:w-[600px] '>
              <img src={import.meta.env.BASE_URL+ import.meta.env.VITE_IMG_PATH +product.image} alt={product.title} />
            </div>
            <div>
                <h1 className='text-3xl text-white font-bold mb-4'>{product.title}</h1>
                <p className='text-gray-300 mb-6'>{product.description}</p>
                <div className='mb-6'>
                  <span className='text-3xl text-white font-bold'>${product.price}</span>
                </div>
                <div className='mb-6'>
                  <h3 className='font-semibold text-gray-300 mb-2'>Category</h3>
                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm'>{product.category}</span>
                </div>
                <button onClick={()=> dispatch(addToCart(product))} className='w-full md:w-auto bg-zinc-200 px-8 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-zinc-300'><ShoppingCart/>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetails
