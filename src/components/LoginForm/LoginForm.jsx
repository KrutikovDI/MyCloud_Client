import React, { useState } from 'react'
import { NavLink, useNavigate  } from "react-router-dom";
import classes from './loginForm.module.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from '../../redux/slices/userSlice';
import ModalError from '../ModalError/ModalError';



const LoginForm = () => {
  const [ form, setForm ] = useState({
    useLogin: '',
    password: '',
    error: false,
    textMessage: '',
    admin: false,
  })
  const { useLogin, password, error, textMessage, admin } = form;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.user)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prevForm => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserLogin({
      login: useLogin,
      password: password,
      admin: admin,
    })).then(response => {
    if (response.payload.status != 200) {
      setForm(prevForm => ({...prevForm, error: true, textMessage: response.payload}))
    } else {
      navigate('/')
    }
  })
  }

  const hendleModal = () => {
    setForm(prevForm => ({...prevForm, error: false, textMessage: ''}))
  }

  return (
    <>
      <form className={classes['form']} onSubmit={handleSubmit}>
        <label htmlFor="login">Введите логин</label>
        <input className={classes['input']} id='login' name='useLogin' type="text" value={useLogin} placeholder='Login' onChange={handleChange} required/>
        <label htmlFor="password">Введите пароль</label>
        <input className={classes['input']} id='password' name='password' type="text" value={password} placeholder='Пароль' onChange={handleChange} required/>
        <label htmlFor="policy">Вход с правами администратора
          <input id='admin' name='admin' type="checkbox" checked={admin} onChange={handleChange}/>
        </label>
          <button className={classes['button']} type='submit'>Войти</button>
          {loading ? <p>ЗАГРУЗКА</p>: ''}
      </form>
      <>
      {error ? <ModalError context={ [textMessage, hendleModal] }/> : ''}
      </>
    </>


  )
}

export default LoginForm