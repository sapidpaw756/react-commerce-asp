import { Minus, Plus, Trash2 } from 'lucide-react';
import React , {useState, useEffect , useMemo}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link , useParams } from 'react-router-dom';
import Footer from '../assets/components/Footer';

function OrderPage() {

  const dispatch = useDispatch();

  let cartItems = useSelector((state) => state.order.items);

  if(!cartItems){
    return <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h2>Your Cart is Empty</h2>
          <p className='text-gray-600 mb-4'>Add Some Products to Your Cart to see them here</p>
          <Link to="/" className="inline-block bg-zinc-200 px-6 py-2 rounded-lg hover:bg-zinc-300">Continue Shopping</Link>
        </div>
    </div>
  }


  const total = cartItems.reduce((sum, item) => sum + item.price * item.count,0); 

  if(cartItems.length === 0){
    return <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h2>Your Cart is Empty</h2>
          <p className='text-gray-600 mb-4'>Add Some Products to Your Cart to see them here</p>
          <Link to="/" className="inline-block bg-zinc-200 px-6 py-2 rounded-lg hover:bg-zinc-300">Continue Shopping</Link>
        </div>
    </div>
  }

  return (
    <div> 
      <div className='container mx-auto px-4 py-8'>
        <h2 className='text-2xl font-bold mb-8'>To Received</h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 shadow-md p-4 rounded-md'>
            {cartItems.map((item) => (
              <div key={item.productId} className={'flex items-center gap-4 py-4 ' +(item.count > 1 ? 'border-b': '')}>
                <Link to={`/product/${item.productId}`}>
                  <img src={item.image} alt={item.title} className='w-32 h-32 object-cover rounded' />
                </Link>
                <div className='flex-1'>
                  <Link to={`/product/${item.productId}`} className="font-semibold hover:text-blue-600">
                    {item.title}
                  </Link>
                  <div className='flex items-center gap-2 mt-2'>           
                    <p className='text-gray-600'>${parseInt(item.price).toFixed(2)}</p>      
                    <span>x1</span>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-bold'>
                    Total {item.count} Items:
                    ${(item.price * item.count).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='lg:col-span-1'>
            <div className='bg-white shadow-md p-6 rounded-md'>
              <h3 className='text-xl font-bold mb-4'>Order Summary</h3>
              <div className='space-y-2 mb-4'>
                <div className='flex justify-between'>
                  <span>Sub Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className='border-t pt-2 font-bold'>
                  <div className='flex justify-between'>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    </div>
  )
}

export default OrderPage
