import React, { useContext, useState } from 'react'
import './NavBar.css'
import  { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const NavBar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("Главная")

    const { getTotalCartAmount, getItemsCount } = useContext(StoreContext)


  return (
    <div className='navBar'>
      <Link to='/'><img src={assets.logo} alt='' className='logo' /></Link>
      <ul className="navBarMenu">
        <Link to='/' onClick={()=>setMenu("Главная")} className={menu==="Главная"?"active":""}>Главная</Link>
        <a href='/#exploreMenu' onClick={()=>setMenu("Меню")} className={menu==="Меню"?"active":""}>Меню</a>
        <a href='/#appDownload' onClick={()=>setMenu("Приложение")} className={menu==="Приложение"?"active":""}>Приложение</a>
        <a href='/#footer' onClick={()=>setMenu("О-нас")} className={menu==="О-нас"?"active":""}>О нас</a>
      </ul>
      <div className="navBarRight">
        <img src={assets.search_icon} alt="" />
        <div className="navBarSearchIcon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" className="" /></Link>
            <div className={getItemsCount()===0?"":"itemCounter"}>{getItemsCount()===0?"":getItemsCount()}</div>
        </div>
        <button onClick={()=>setShowLogin(true)}>Авторизация</button>
      </div>
    </div>
  )
}

export default NavBar
