import React from 'react';
import {Link} from 'react-router-dom';


function ProductCard({product}) {

  return (
    <Link to={`/product/${parseInt(product.id)}`}>
        <div className='shadow-lg rounded-md cursor-pointer'>
            <img src={import.meta.env.BASE_URL + import.meta.env.VITE_IMG_PATH + product.image} className='h-40 object-cover w-full'/>
            <div className='bg-gray-50 p-4'>
                <h2 className='text-lg font-semibold my-4'>
                    {product.title.substring(0, 20) + '...'}
                </h2>
                <p className='text-sm text-zinc-500 border-b-2 pb-4'>{product.description.substring(0, 50) + '...'}</p>
                <div className='flex justify-between mt-4 items-center'>
                    <p className='text-xl font-semibold'>${parseInt(product.price).toFixed(2)}</p>
                    <p>View Details</p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard
