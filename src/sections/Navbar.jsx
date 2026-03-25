import ShoppingCart from '@/components/ShoppingCart'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    const links = [
        { title: 'Home', link: '/' },
        { title: 'Products', link: '/' },
    ]
    
    return (
        <nav
            className="px-12 md:px-24 py-6 bg-primary w-full h-[100px] inset-0 z-40 font-semibold
                        flex flex-wrap items-center justify-between border border-b-gray/10"
        >
            <div className='flex items-center gap-6'>
                {links.map(link => (
                    <NavLink
                        to={link.link}
                        className="text-gray text-medium capitalize hover:text-secondary transition"
                    >
                        {link.title}
                    </NavLink>
                ))}
            </div>

            <ShoppingCart />
        </nav>
    )
}

export default Navbar