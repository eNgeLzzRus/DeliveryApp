import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import './index.css'
import Menu from './pages/Menu/Menu'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div className='mainDiv'>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className='App'>
        <NavBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeOrder' element={<PlaceOrder />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App