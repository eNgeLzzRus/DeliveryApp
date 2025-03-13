import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='appDownload' id='appDownload'> 
      <p>Для удобства скачайте <br /> Приложение <p className='ps p1'>Еду.<p className='ps p2'>Маркет</p></p></p>
      <div className="appDownloadPlatforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
