import React, { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { FaCartShopping } from "react-icons/fa6"
import { IoMdArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { TbTrashX } from "react-icons/tb";
import image from '@/assets/images/1.webp'

import { useCart } from '@/context/CartContext';
import CartCard from './CartCard';

function ShoppingCart() {
    const { cart, cartTotal, cartCount } = useCart()

    return (
        <Drawer
            direction="right"
        >
            <DrawerTrigger className='relative flex items-center gap-2 text-medium text-gray hover:text-secondary'>
                Cart
                <FaCartShopping />
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-4 bg-red-400 text-white text-xsmall rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                    </span>
                )}
            </DrawerTrigger>
            <DrawerContent className="right-0 overflow-hidden h-full w-[400px] sm:w-[500px]">
                <DrawerHeader>
                    <DrawerTitle>Shopping Cart ({cart.length} items)</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                {/* list of items */}
                <div className=' flex flex-col justify-between'>

                    <div className="flex flex-col gap-3 no-scrollbar overflow-y-auto px-4">
                        {cart.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                Your cart is empty
                            </div>
                        ) : (
                            cart.map((item) => (
                                // single item
                                <CartCard item={item} />
                            ))
                        )}
                    </div>


                </div>
                <DrawerFooter>
                    {cart.length > 0 && (
                        <div className='border-t-2 border-t-gray-300 px-4 py-2 flex flex-col gap-3'>
                            <span className='flex justify-between items-center font-medium'>
                                SUBTOTAL
                                <span className="text-xl text-secondary">${cartTotal.toFixed(2)}</span>
                            </span>
                            <button className='main-btn flex justify-center items-center gap-2 w-full'>
                                Checkout <IoMdArrowForward size={20} />
                            </button>
                        </div>
                    )}
                    <DrawerClose className="mt-2 text-gray-500 hover:text-gray-700">
                        Continue Shopping
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ShoppingCart