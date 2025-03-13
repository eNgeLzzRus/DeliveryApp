import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div>
      <div className='exploreMenu' id='exploreMenu'>
        <h1>Изучите наше меню</h1>
        <p className='exploreMenuText'>Выбирайте из огромного списка блюд любимые</p>
        <div className="exploreMenuList">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='exploreMenuListItem'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
      </div>
    </div>
  )
}

export default ExploreMenu
