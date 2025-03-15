import React from 'react'
import './MenuCategories.css'
import { menu_list } from '../../assets/assets'

const MenuCategories = ({category, setCategory}) => {
  return (
    <div>
        <div className="menuCategories">
            <h1>Категории</h1>
            <div className="menuCategoriesList">
                {menu_list.map((item, index)=> {
                    return (
                        <p onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className={category===item.menu_name?"active":""}>{item.menu_name}</p>
                    )
                })}
            </div>
        </div>      
    </div>
  )
}

export default MenuCategories
