// App.jsx

import './App.css'
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Menu from './pages/Menu/Menu'
import AboutUs from './pages/AboutUs/AboutUs'
import AuthPage from './pages/AuthPage/AuthPage'
import PrivateRoute from './routes/PrivateRoute'

const AppContent = () => {
  const location = useLocation()
  const hideNavAndFooter = location.pathname === '/auth'

  return (
    <div className='App'>
      {!hideNavAndFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/placeOrder" element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />
        <Route path="/aboutUs" element={<PrivateRoute><AboutUs /></PrivateRoute>} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </div>
  )
}

const App = () => (
  <div className='mainDiv'>
    <AppContent />
  </div>
)

export default App