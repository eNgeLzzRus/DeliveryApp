import React, { useContext, useEffect } from 'react';
import './NavBar.css';
import { assets } from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { MenuContext } from '../../context/MenuContext';
import { AccountContext } from '../../context/AccountContext';
import { CartContext } from '../../context/CartContext';

const NavBar = () => {
  const { user, logout } = useContext(AccountContext);
  const { updateMenu, getMenu } = useContext(MenuContext);
  const { cartItems } = useContext(CartContext);
  const location = useLocation();

  // Прокрутка вверх и обновление меню при изменении пути
  useEffect(() => {
    window.scrollTo(0, 0);

    const pathToMenuMap = {
      '/': 'Главная',
      '/menu': 'Меню',
      '/about': 'О-нас',
      '/profile': 'Профиль',
      '/cart': ''
    };

    const currentMenu = pathToMenuMap[location.pathname] || '';
    updateMenu(currentMenu);
    localStorage.setItem('currentMenu', currentMenu);
  }, [location.pathname]);

  const getItemsCount = () => {
    return Object.values(cartItems).reduce((sum, val) => sum + val, 0);
  };

  // Функция для обработки клика по ссылке
  const handleLinkClick = (menuName) => {
    updateMenu(menuName);
    localStorage.setItem('currentMenu', menuName);

    if (window.location.pathname === getPathForMenu(menuName)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Вспомогательная функция для получения пути по имени меню
  const getPathForMenu = (menuName) => {
    const menuToPathMap = {
      'Главная': '/',
      'Меню': '/menu',
      'О-нас': '/aboutUs'
    };
    return menuToPathMap[menuName] || '/';
  };

  return (
    <div className="light-navBar">
      <Link to="/" onClick={() => handleLinkClick('Главная')}>
        <img src={assets.logo} alt="Logo" className="light-logo" />
      </Link>

      <ul className="light-navBarMenu">
        <li>
          <Link 
            to="/" 
            onClick={() => handleLinkClick('Главная')}
            className={getMenu() === "Главная" ? "light-active" : "" ? "" : ""}
          >
            Главная
          </Link>
        </li>
        <li>
          <Link 
            to="/menu" 
            onClick={() => handleLinkClick('Меню')}
            className={getMenu() === "Меню" ? "light-active" : "" ? "" : ""}
          >
            Меню
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            onClick={() => handleLinkClick('О-нас')}
            className={getMenu() === "О-нас" ? "light-active" : "" ? "" : ""}
          >
            О нас
          </Link>
        </li>
        <li>
          <Link 
            to="/profile" 
            onClick={() => handleLinkClick('Профиль')}
            className={getMenu() === "Профиль" ? "light-active" : "" ? "" : ""}
          >
            Профиль
          </Link>
        </li>
      </ul>

      <div className="light-navBarRight">
        <div className="light-cartIconWrapper">
          <Link to="/cart" onClick={() => window.scrollTo(0, 0)}>
            <img src={assets.basket_icon} alt="Корзина" className="light-cartIcon" />
            <div className="light-itemCounter">{getItemsCount() === 0 ? null : getItemsCount()}</div>
          </Link>
        </div>
        <button className="light-logoutButton" onClick={logout}>
          <span className="light-logoutText">Выйти</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;