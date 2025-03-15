import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import { useMenu } from '../../context/menuContext'

const Header = () => {

  const navigate = useNavigate()

  const { updateMenu } = useMenu()

  return (
    <div className='header'>
      <div className="headerContents">
        <h2>Закажи любимые блюда у нас</h2>
        <p>В нашем онлайн-ресторане вы можете заказать еду на любой вкус. У нас есть фастфуд, национальные блюда, десерты и многое другое. Достаточно лишь зайти в меню и выбрать позиции, и ваши любимые блюда отправятся прямо к вам домой</p>
        <button onClick={()=> {navigate("/menu"), updateMenu('Меню')}}>Смотреть меню</button>
      </div>
    </div>
  )
}

export default Header
