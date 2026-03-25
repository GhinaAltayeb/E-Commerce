import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import CartProvider from './context/CartContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/E-Commerce'>
      <CartProvider>
        <Routes>
          <Route index element={<App />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
