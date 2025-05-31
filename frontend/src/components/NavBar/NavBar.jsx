import React, { useContext } from 'react'
import './NavBar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useMenu } from '../../context/MenuContext'
import { AccountContext } from '../../context/AccountContext'
import { CartContext } from '../../context/CartContext'

const NavBar = () => {
  const { user, logout } = useContext(AccountContext)
  const { updateMenu, getMenu } = useMenu()
  const { cartItems, getTotalCartAmount } = useContext(CartContext)

  const getItemsCount = () => {
    return Object.values(cartItems).reduce((sum, val) => sum + val, 0)
  }

  return (
    <div className='navBar'>
      <Link to='/'><img onClick={() => updateMenu("Главная")} src={assets.logo} alt='Logo' className='logo' /></Link>

      <ul className="navBarMenu">
        <li>
          <Link to='/' onClick={() => updateMenu("Главная")} className={getMenu() === "Главная" ? "active" : ""}>
            Главная
          </Link>
        </li>
        <li>
          <Link to='/menu' onClick={() => updateMenu("Меню")} className={getMenu() === "Меню" ? "active" : ""}>
            Меню
          </Link>
        </li>
        <li>
          <Link to='/aboutUs' onClick={() => updateMenu("О-нас")} className={getMenu() === "О-нас" ? "active" : ""}>
            О нас
          </Link>
        </li>
      </ul>

      <div className="navBarRight">
        <div className="navBarSearchIcon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Корзина" />
            <div className={getItemsCount() === 0 ? "" : "itemCounter"}>
              {getItemsCount() === 0 ? "" : getItemsCount()}
            </div>
          </Link>
        </div>
        <button className='logoutButton' onClick={logout}>Выйти</button>
      </div>
    </div>
  )
}

export default NavBar
