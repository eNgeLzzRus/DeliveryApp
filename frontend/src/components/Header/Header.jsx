import React, { useContext } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../../context/MenuContext';

const Header = () => {
  const navigate = useNavigate();
  const { updateMenu } = useContext(MenuContext);

  return (
    <div className='light-neon-header'>
      <div className="light-neon-header-contents">
        <h2>ЗАКАЖИ ЛЮБИМЫЕ БЛЮДА У НАС</h2>
        <p>В нашем онлайн-ресторане вы можете заказать еду на любой вкус. У нас есть фастфуд, национальные блюда, десерты и многое другое.</p>
        <button 
          onClick={() => { navigate("/menu"); updateMenu('Меню'); }}
          className="light-neon-button"
        >
          СМОТРЕТЬ МЕНЮ
        </button>
      </div>
    </div>
  );
};

export default Header;