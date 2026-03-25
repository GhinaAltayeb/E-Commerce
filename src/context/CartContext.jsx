import React, { act, createContext, useContext, useEffect, useReducer, useState } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':{
            const exsistingItem = state.items.find(item => item.id === action.payload.id)
            if (exsistingItem) {
                return {
                    ...state,
                    items: state.items.map(
                        item => item.id === action.payload.id ?
                            { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                }
            }
        }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }]
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            }

        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                        : item
                )
            }

        case 'CLEAR_CART':
            return {
                ...state,
                items: []
            }

        case 'LOAD_CART':
            return {
                ...state,
                items: action.payload
            }

        default:
            return state;
    }
}
// Helper functions for localStorage
const loadCartFromLocalStorage = () => {
    try {
        const savedCart = localStorage.getItem('shopping-cart')
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart)
            return parsedCart.items || []
        }
    } catch (error) {
        console.error('Error loading cart from localStorage:', error)
    }
    return [];
}

const saveCartToLocalStorage = (items) => {
    try {
        localStorage.setItem('shopping-cart', JSON.stringify({ items }))
    } catch (error) {
        console.error('Error saving cart to localStorage:', error)
    }
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] })
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        const savedItems = loadCartFromLocalStorage();
        if (savedItems.length > 0) {
            dispatch({ type: 'LOAD_CART', payload: savedItems })
        }
        setIsInitialized(true)
    }, [])

    useEffect(() => {
        if (isInitialized) {
            saveCartToLocalStorage(state.items);
        }
    }, [state.items, isInitialized])


    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product })
    }

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id })
    }

    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }

    const getCartTotal = () => {
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    };

    const getCartCount = () => {
        return state.items.reduce((count, item) => count + item.quantity, 0)
    };

    return (
        <CartContext.Provider value={{
            cart: state.items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context;
}