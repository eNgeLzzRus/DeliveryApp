// App.jsx

import './App.css'
import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Menu from './pages/Menu/Menu'
import About from './pages/About/About'
import AuthPage from './pages/AuthPage/AuthPage'
import PrivateRoute from './routes/PrivateRoute'
import FullscreenLoader from './components/FullScreenLoader/FullScreenLoader'
import Profile from './pages/Profile/Profile'

const AppContent = () => {
  const location = useLocation()
  const hideNavAndFooter = location.pathname === '/auth'
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // В реальном приложении убрать таймер
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <FullscreenLoader />}
      <div className={`app-content ${isLoading ? 'content-hidden' : 'App'}`}>
        {!hideNavAndFooter && <NavBar />}
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
        {!hideNavAndFooter && <Footer />}
      </div>
    </>
  )
}

const App = () => (
  <div className='mainDiv'>
    <AppContent />
  </div>
)

export default App