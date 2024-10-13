import React, { useState } from 'react'
import RegistrationForm from '../components/RegistrationForm/RegistrationForm'
import LoginForm from '../components/LoginForm/LoginForm'

const LoginPage = () => {
    const [ auth, setAauth ] = useState({
        registration: false,
        login: false,
    })
    const { registration, login } = auth

    const handleRegistration = () => {setAauth(preForm => ({...preForm, registration: true, login: false, admin: false}))}
    const handleLogin = () => {setAauth(preForm => ({...preForm, registration: false, login: true, admin: false}))}
    const handleAdmin = () => {setAauth(preForm => ({...preForm, registration: false, login: true, admin: true}))}

  return (
    <>
      <div className='formHead'>
        <h3 className='h3'>Облачное хранилице Ваших данных<br/>My Cloud<br/>Приложение позволяет хранить, отображать, загружать, отправлять и скачивать файлы<br/>Для продолжения работы авторизируйтесь, пожалуйста</h3>
        <button onClick={handleRegistration}>Регистрация</button>
        <button onClick={handleLogin}>Войти</button>
      </div>
      <div className='formAuth'>
        {registration && <RegistrationForm/>}
        {login && <LoginForm/>}
      </div>
    </>
  )
}

export default LoginPage
