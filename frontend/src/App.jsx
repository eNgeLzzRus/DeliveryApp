// App.jsx
import './App.css' // твой файл стилей (см. ниже)
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Menu from './pages/Menu/Menu'
import AboutUs from './pages/AboutUs/AboutUs'
import AuthPage from './pages/AuthPage/AuthPage'
import PrivateRoute from './routes/PrivateRoute'

const App = () => {
  return (
    <div className='mainDiv'>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/placeOrder" element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />
          <Route path="/aboutUs" element={<PrivateRoute><AboutUs /></PrivateRoute>} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App