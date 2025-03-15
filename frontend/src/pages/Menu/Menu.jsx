import React, { useState } from 'react'
import './Menu.css'
import { menu_list } from '../../assets/assets'
import MenuCategories from '../../components/MenuCategories/MenuCategories'
import FoodMenu from '../../components/FoodMenu/FoodMenu'

const Menu = () => {

    const [category, setCategory] = useState("All")

  return (
    <div className='menuDiv'>
        <MenuCategories category={category} setCategory={setCategory}/>
        <FoodMenu category={category}/>
    </div>
  )
}

export default Menu
