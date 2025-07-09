import React, { useState } from 'react'
import './Menu.css'
import MenuCategories from '../../components/MenuCategories/MenuCategories'
import FoodMenu from '../../components/FoodMenu/FoodMenu'

const Menu = () => {

    const [category, setCategory] = useState(null)

  return (
    <div className='menuDiv'>
        <MenuCategories category={category} setCategory={setCategory}/>
        <FoodMenu category={category}/>
    </div>
  )
}

export default Menu
