import { Minus, Plus, Trash2 } from 'lucide-react';
import React , {useState, useEffect , useMemo}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link , useParams } from 'react-router-dom';
import { fetchOrder } from '../features/order/OrderSlice';
import { removeFromCart, updateQuantity, removeCart } from '../features/cart/cartSlice';
import Footer from '../assets/components/Footer';
import axios from 'axios';
import { ToastContainer, toast , Bounce} from 'react-toastify';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

function CartPage() {

  const dispatch = useDispatch();

  let cartItems = useSelector((state) => state.cart.items);

  const checkOut = async () =>{

        const model = [];

        for (const elem of cartItems) {
          model.push({"productId":elem.id,"count": elem.quantity,"userId": localStorage.getItem('userName').slice(0,10)});
        }
 
        await axios.post(`${import.meta.env.VITE_SERVICE_LINK}orders`,  model, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${localStorage.getItem('userSession')}`
            }
        }).then((response) => {
            if(response.request.status == 200){
                toast.success("Successfully Checkout!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                dispatch(removeCart());
                const orderModal = {
                    id: localStorage.getItem('userName'),
                    token : localStorage.getItem('userSession')
                }
                dispatch(fetchOrder(orderModal));
            }
        })
        .catch(function (err) {
            if(err.response.status == 404){
                setisError('Invalid username or password');
            }
        });
  }

  useMemo(() => {
    if(cartItems === null){
      return;
    }
    if (!cartItems.length) {
      cartItems = JSON.parse(localStorage.getItem("cartItems")); 
      if(cartItems != null){
        cartItems = cartItems.filter((prod) => prod.quantity > 0);
      }
    
    } else {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }); 

  if(!cartItems){
    return <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h2>Your Cart is Empty</h2>
          <p className='text-gray-600 mb-4'>Add Some Products to Your Cart to see them here</p>
          <Link to="/" className="inline-block bg-zinc-200 px-6 py-2 rounded-lg hover:bg-zinc-300">Continue Shopping</Link>
        </div>
    </div>
  }


  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity,0); 

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
        <h2 className='text-2xl font-bold mb-8'>Shopping Cart</h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 shadow-md p-4 rounded-md'>
            {cartItems.map((item) => (
              <div key={item.id} className='flex items-center gap-4 py-4 border-b'>
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.title} className='w-24 h-24 object-cover rounded' />
                </Link>
                <div className='flex-1'>
                  <Link to={`/product/${item.id}`} className="font-semibold hover:text-blue-600">
                    {item.title}
                  </Link>
                  <p className='text-gray-600'>${parseInt(item.price).toFixed(2)}</p>
                  <div className='flex items-center gap-2 mt-2'>
                    <button className='p-1 rounded-full hover:bg-gray-100' onClick={() => 
                      dispatch(updateQuantity({id: item.id, quantity: Math.max(0, item.quantity - 1)}))}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button className='p-1 rounded-full hover:bg-gray-100' onClick={() =>
                      dispatch(updateQuantity({id: item.id, quantity: item.quantity + 1}))}>
                      <Plus size={16} />
                    </button>
                    <div className='ml-4 text-red-500 hover:text-red-700 cursor-pointer' 
                      onClick={()=> dispatch(removeFromCart(item.id))}>
                      <Trash2 size={20}/>
                    </div>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-bold'>
                    ${(item.price * item.quantity).toFixed(2)}
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
              <button className='w-full bg-zinc-200 px-6 py-3 rounded-lg hover:bg-zinc-300' onClick={checkOut}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    </div>
  )
}

export default CartPage
