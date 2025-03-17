import React, { useEffect, useRef, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

    const [currState, setCurrState] = useState("Авторизация")
    const popupRef = useRef(null)

    useEffect(()=> {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setShowLogin(false)
            }
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [setShowLogin])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target))
                setShowLogin(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [setShowLogin])

  return (
    <div className='loginPopup'>
      <form ref={popupRef} action="" className="loginPopupContainer">
        <div className="loginPopupTitle">
            <h2>{currState}</h2>
            <p onClick={()=>setShowLogin(false)} >X</p>
        </div>
        <div className="loginPopupInputs">
            {currState==="Авторизация"?<></>:<input type="text" placeholder='Имя' required/>}
            <input type="email" placeholder='Эл. почта' required/>
            <input type="password" placeholder='Пароль' required/>
        </div>
        <button>{currState==="Регистрация"?"Создать аккаунт":"Авторизация"}</button>
        <div className="loginPopupCondition">
            <input type="checkbox" required/>
            <p>Я прочитал и согласен с правилами использования сайта и политики конфиденциальности</p>
        </div>
        {currState==="Авторизация"
        ?<p>Нет аккаунта? <span onClick={()=>setCurrState("Регистрация")}>Зарегистрироваться</span></p>
        :<p>Уже есть аккаунт? <span onClick={()=>setCurrState("Авторизация")}>Авторизироваться</span></p>
        }
        
      </form>
    </div>
  )
}

export default LoginPopup
