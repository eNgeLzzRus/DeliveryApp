import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footerContent">
        <div className="footerContentLeft">
            <img src={assets.logo} alt="" />
            <p>Интернет-ресторан, в котором Вы можете заказать множество блюд на любой вкус. В меню Еду.Маркет есть национальная кухня, фастфуд, домашняя еда, десерты, напитки и т.д. </p>
            <div className="footerSocialIcons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footerContentCenter">
            <h2>КОМПАНИЯ</h2>
            <ul>
                <li>Главная</li>
                <li>О нас</li>
                <li>Доставка</li>
                <li>Политика конфиденциальности</li>
            </ul>
        </div>
        <div className="footerContentRight">
            <h2>СВЯЗАТЬСЯ С НАМИ</h2>
            <ul>
                <li>+1-123-456-78-90</li>
                <li>contact@edumarket.ru</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footerCopyright">Copyright 2025 © Edumarket.ru - All Right Reserved.</p>
    </div>
  )
}

export default Footer
