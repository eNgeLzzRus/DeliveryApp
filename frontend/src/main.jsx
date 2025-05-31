import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AccountProvider } from './context/AccountContext'
import { CartProvider } from './context/CartContext'
import { MenuProvider } from './context/MenuContext'

// Глобальные стили
import './assets/css/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AccountProvider>
        <CartProvider>
          <MenuProvider>
            <App />
          </MenuProvider>
        </CartProvider>
      </AccountProvider>
    </BrowserRouter>
  </React.StrictMode>
)