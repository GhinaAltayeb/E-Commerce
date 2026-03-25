import React from 'react'
import RatingStars from './RatingStars'

const ProductCard = React.memo(({ item, onAddToCart }) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='bg-gray-100 flex justify-center items-center'>
                <img src={item.images[0]} alt="" loading="lazy" />
            </div>
            <div className='flex justify-between items-center'>
                <h3>{item.title}</h3>
                <span>{item.price}$</span>
            </div>
            <RatingStars rating={item.rating} />
            <button className='main-btn' onClick={() => onAddToCart(item)}>Add to cart</button>
        </div>
    )
})

export default ProductCard