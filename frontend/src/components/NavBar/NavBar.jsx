import React, { useState } from 'react'
import './NavBar.css'
import  { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const NavBar = () => {

    const [menu,setMenu] = useState("Главная")


  return (
    <div className='navBar'>
      <img src={assets.logo} alt='' className='logo' />
      <ul className="navBarMenu">
        <Link to='/' onClick={()=>setMenu("Главная")} className={menu==="Главная"?"active":""}>Главная</Link>
        <a href='#exploreMenu' onClick={()=>setMenu("Меню")} className={menu==="Меню"?"active":""}>Меню</a>
        <a href='#appDownload' onClick={()=>setMenu("Приложение")} className={menu==="Приложение"?"active":""}>Приложение</a>
        <a href='#footer' onClick={()=>setMenu("О-нас")} className={menu==="О-нас"?"active":""}>О нас</a>
      </ul>
      <div className="navBarRight">
        <img src={assets.search_icon} alt="" />
        <div className="navBarSearchIcon">
            <img src={assets.basket_icon} alt="" className="" />
            <div className="dot"></div>
        </div>
        <button>Регистрация</button>
      </div>
    </div>
  )
}

export default NavBar
