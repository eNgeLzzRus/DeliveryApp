import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {
  return (
    <div>
      <Header />
      <FoodDisplay />
      <AppDownload />
    </div>
  )
}

export default Home
