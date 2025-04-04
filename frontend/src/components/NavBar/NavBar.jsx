import React, { useContext, useState } from 'react'
import './NavBar.css'
import  { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { useMenu } from '../../context/MenuContext'

const NavBar = ({setShowLogin}) => {

    const { updateMenu, getMenu } = useMenu()

    const { getItemsCount } = useContext(StoreContext)


  return (
    <div className='navBar'>
      <Link to='/'><img onClick={()=>updateMenu("Главная")} src={assets.logo} alt='' className='logo' /></Link>
      <ul className="navBarMenu">
        <Link to='/' onClick={()=>updateMenu("Главная")} className={getMenu()==="Главная"?"active":""}>Главная</Link>
        <Link to='/menu' onClick={()=>updateMenu("Меню")} className={getMenu()==="Меню"?"active":""}>Меню</Link>
        <Link to='/aboutUs' onClick={()=>updateMenu("О-нас")} className={getMenu()==="О-нас"?"active":""}>О нас</Link>
      </ul>
      <div className="navBarRight">
        <img src={assets.search_icon} alt="" />
        <div className="navBarSearchIcon" onClick={()=>updateMenu("")}>
            <Link to='/cart'><img src={assets.basket_icon} alt="" className="" /></Link>
            <div className={getItemsCount()===0?"":"itemCounter"}>{getItemsCount()===0?"":getItemsCount()}</div>
        </div>
        <button onClick={()=>setShowLogin(true)}>Авторизация</button>
      </div>
    </div>
  )
}

export default NavBar
