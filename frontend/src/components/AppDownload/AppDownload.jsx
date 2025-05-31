import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='appDownload' id='appDownload'> 
      <p>Для удобства скачайте <br /> Приложение <span className='ps p1'>Еду.<span className='ps p2'>Маркет</span></span></p>
      <div className="appDownloadPlatforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
