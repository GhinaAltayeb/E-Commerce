import React from 'react'
import { useCart } from '@/context/CartContext'
import { TbTrashX } from "react-icons/tb";
import { IoIosRemove, IoIosAdd } from "react-icons/io";
const CartCard = React.memo(({ item }) => {
    const { removeFromCart, updateQuantity } = useCart()

    const handleQuantityChange = (id, value) => {
        const quantity = parseInt(value) || 1
        updateQuantity(id, quantity)
    }

    return (
        <div className='grid grid-cols-[120px_auto] border-gray border rounded-2xl'>

            {/* imgae */}
            <div className='bg-gray-100 flex justify-center items-center min-h-[120px] bg-center bg-contain'
                style={{ backgroundImage: `url(${item.thumbnail || item.images?.[0]})` }}

            >
            </div>

            {/* details */}
            <div className='py-2 px-3 flex flex-col justify-between'>
                <div>
                    <div className='flex justify-between'>
                        <h3>{item.title}</h3>
                        <button className='hover:text-secondary' onClick={() => removeFromCart(item.id)}>
                            <TbTrashX size={20} />
                        </button>
                    </div>
                    <span className='text-gray-400'>
                        Brand:
                        <span className='text-primary'>{item.brand}</span>
                    </span>
                </div>
                <div className='flex justify-between items-center'>
                    {/* increse / decrease quantity */}
                    <div className='flex items-center bg-gray-100 rounded-sm px-3 py-2'>
                        <button
                            className="px-2 py-1"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                            <IoIosRemove size={20} />
                        </button>

                        {/* <TextField
                                            value={qty}
                                            size="small"
                                            style={{ width: 60 }}
                                        /> */}

                        <input
                            type="number"
                            className='quantity'
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}

                        />

                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                            <IoIosAdd size={25} />
                        </button>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
})

export default CartCard