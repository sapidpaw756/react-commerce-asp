import React, {useEffect} from 'react';
import ProductCard from './ProductCard';
import { useSelector , useDispatch} from 'react-redux';
import { fetchTodo } from '../../features/products/ProductSlice';
const gallery = Object.values(import.meta.glob('@assets/imgs/products/*.{png,jpg,jpeg,PNG,JPEG,webp}', { eager: true, as: 'url' }))

function ProductGrid() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  useEffect(()=>{
    dispatch(fetchTodo())
  },[])
  return (
    <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-16 lg:gap-12 2xl:gap-16 my-24'>
        {products.isLoading ? <h1>Loading...</h1>: products.filteredItems.map((product) => {
            return <ProductCard key={parseInt(product.id)} product={product}/>
        })}
    </div>
  )
}

export default ProductGrid
