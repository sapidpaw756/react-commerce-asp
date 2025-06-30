import React, { useState , useMemo , useEffect} from 'react'
import { Link } from 'react-router-dom';
import { ShoppingCart, TrendingUp, User , Truck} from 'lucide-react';
import  logo  from '../imgs/asp-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../features/products/ProductSlice';
import axios from 'axios';
import { Modal, Box, Typography, TextField, Button, Alert  } from '@mui/material';
import { fetchOrder , removeOrder} from '../../features/order/OrderSlice';
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

export default function Navbar() {


    const [isOpen, SetisOpen] = useState(false);
    const [modalIsOpen, setModalOpen] = useState(false);
    const [modalIsOpenRegister, setModalOpenRegister] = useState(false);
    const [isError, setisError] = useState('');
    const [isErrorRegister, setErrorRegister] = useState('');
    const [isLogin, setisLogin] = useState(false);
    const [isUser, setisUser] = useState('');
    const [isWarning, setisWarning] = useState(false);
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.product.searchTerm);
    const productz = useSelector((state) => state.order);
    

    const loginUser = async () =>{
        if(!document.querySelector('#userName').value || !document.querySelector('#password').value){
            setisError('username and password should not be empty');
            return;
        }
        setisError('');
        await axios.post(`${import.meta.env.VITE_SERVICE_LINK}getuser`, {
            username: document.querySelector('#userName').value,
            password: document.querySelector('#password').value
        }).then((response) => {
            if(response.status == 200){

                SetCrendentials(response);

                closeModal();
            }
        })
        .catch(function (err) {
            if(err.response.status == 404){
                setisError('Invalid username or password');
            }
        });
    }

    const logOut = () =>{
        setisLogin(false);
        localStorage.removeItem("userSession");
        localStorage.removeItem("userName");
        localStorage.removeItem("firstName");
        setisUser('');
        SetisOpen(false);
        dispatch(removeOrder());
    }

    useEffect(() => {
        if(localStorage.getItem('userSession')){
            const modal = {
                id: localStorage.getItem('userName'),
                token : localStorage.getItem('userSession')
            }
            dispatch(fetchOrder(modal));
        }   
   },[])

    useEffect(() => {
        if(localStorage.getItem('userSession')){
            if(productz.errorCode == 403 &&  isWarning == false){
                logOut();
                setisWarning(true);
                toast.warn("Session Timeout!", {
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
            } else {
                setisUser(localStorage.getItem('firstName'));
            }
        }   
   })
   

   

    const SetCrendentials = (res) =>{
        localStorage.setItem("userSession", res.data.token);
        localStorage.setItem("userName", res.data.id);
        localStorage.setItem("firstName", res.data.firstName);
        setisLogin(true);
        setisUser(res.data.firstName);
        dispatch(fetchOrder(res.data));
    }

    //cart
    let cartItems = useSelector((state) => state.cart.items);
    let orderItems = useSelector((state) => state.order.items);

    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const orderCount = orderItems.reduce((total, item) => total + item.count, 0);

    const openModal = ()=>{
        setModalOpen(true);
        handleUser(!isOpen);
    }

    const openModalRegister = ()=>{
        setModalOpenRegister(true);
        SetisOpen(false);
        setModalOpen(false);
    }

    const closeModal= ()=>{
        setModalOpen(false);
    }

    const closeModalRegister = ()=>{
        setModalOpenRegister(false);
    }

    const handleUser = ()=>{
        SetisOpen(!isOpen);
    };

    const registerUser = async () =>{
        const userModel = {
            'firstName' :  document.querySelector('#firstName').value,
            'lastName' :  document.querySelector('#lastName').value,
            'email' :  document.querySelector('#email').value,
            'phone' :  document.querySelector('#phone').value,
            'address' :  document.querySelector('#address').value,
            'username' :  document.querySelector('#username').value,
            'password' :  document.querySelector('#password').value
        } 

        if(document.querySelector('#password').value !== document.querySelector('#rpassword').value){
            setErrorRegister('Password does not match');
            return;
        }
        setErrorRegister('');
        await axios.post(`${import.meta.env.VITE_SERVICE_LINK}contact`, userModel, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(response.status == 200){
                alert('successful register');
                closeModalRegister();
            }
        })
        .catch(function (err) {
            console.log(err);
            setErrorRegister(err.response.data.message ? err.response.data.message : err.response.data.errorResponse.errmsg);
        });
    }
    return (
        <div>
            <header className='bg-white shadow-md'>
        
                <div className='py-4 shadow-md bg-skin-light_red'>
                    <ul className='container mx-auto flex flex-wrap justify-between md:flex-row px-4 md:px-2 items-center relative'>
                        <div className='flex gap-4 text-white'>
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
                        </div>
                        <div className={`${isOpen ? 'flex flex-col absolute right-0 md:right-0 top-12 z-10 bg-white border border-zinc-200 p-4 gap-4' : 'hidden' }`}>
                            {!isLogin &&(
                                <div className='flex gap-4 flex-col'>
                                    <li><Link to='/' onClick={openModal}>Sign In</Link></li>
                                    <li><Link to='/' onClick={openModalRegister}>Create Account</Link></li>
                                </div>
                            )}
                            <li><Link to='/'>My Account</Link></li>
                            {isLogin &&(
                                <li><Link to='/' onClick={logOut}>Log Out</Link></li>
                            )}
                        </div>
                        <div className="flex items-center">
                            <p className="login-user mr-4 text-white">{isUser}</p>
                            <User size={40} className='bg-white p-2 text-black rounded cursor-pointer' onClick={handleUser}/>
                        </div>
                    </ul>
                </div>
                <nav className='flex justify-between items-center container mx-auto md:py-6 py-8 px-2'>  
                    <div className='flex items-center'>
                        <Link to='/' className='bg-gray-700 py-2 px-4 rounded'>
                            <img src={logo} alt='' className='h-6'/>
                        </Link>
                    </div>
                    <form className='w-1/2 sm:block hidden'>
                        <input type='text' placeholder='Search Product' className='bg-zinc-100 rounded-md border border-zinc-200 focus:outline-none p-3 w-full' value={searchTerm} onChange={(e)=> dispatch(setSearchTerm(e.target.value))} />
                    </form>
                    <div className='flex'>
                        <Link to={'/order'} className='relative'>
                            <Truck size={44} className='cursor-pointer bg-gray-100 py-2 px-3 rounded-full mr-2' />
                            {orderCount > 0 &&(
                                <span className='absolute -top-2 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>{orderCount}</span>
                            )}
                        </Link>
                        <Link to={'/cart'} className='relative'>
                            <ShoppingCart size={44} className='cursor-pointer bg-gray-100 py-2 px-3 rounded-full' />
                            {itemCount > 0 &&(
                                <span className='absolute -top-2 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>{itemCount}</span>
                            )}
                        </Link>
                    </div>
                </nav>
            </header>
             <Modal
                open={modalIsOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="modal-sign-in">
                    <TextField id="userName" label="User Name" variant="outlined" margin="dense" fullWidth  />
                    <TextField id="password" label="Password" variant="outlined" margin="dense" type="password" fullWidth />
                    <Button variant="contained" size="large" fullWidth  onClick={loginUser}> 
                        Sign In
                    </Button>
                    <p className="error">{isError}</p>
                    <div>
                        Not a member? <a href="#" className="register-link" onClick={openModalRegister}>Register</a>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={modalIsOpenRegister}
                onClose={closeModalRegister}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="modal-sign-in">
                    <TextField id="firstName" label="First Name" variant="outlined" margin="dense" fullWidth  />
                    <TextField id="lastName" label="Last Name" variant="outlined" margin="dense" fullWidth  />
                    <TextField id="email" label="Email Address" variant="outlined" margin="dense" fullWidth  />
                    <TextField id="phone" label="Phone Number" variant="outlined" margin="dense" fullWidth  />
                    <TextField id="address" label="Adress" variant="outlined" margin="dense" fullWidth  />
                    <TextField id="username" label="User Name" variant="outlined" margin="dense" fullWidth  />
                    <TextField id="password" label="Password" variant="outlined" margin="dense" type="password" fullWidth />
                    <TextField id="rpassword" label="Repeat Password" variant="outlined" margin="dense" type="password" fullWidth />
                    <Button variant="contained" size="large" fullWidth  onClick={registerUser}> 
                        Register
                    </Button>
                    <p className="error">{isErrorRegister}</p>
                </Box>
            </Modal>
            <ToastContainer/>
        </div>
    );
}
