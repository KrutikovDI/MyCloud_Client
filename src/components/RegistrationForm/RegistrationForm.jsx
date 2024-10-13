import React, { useState } from 'react'
import classes from './registrationForm.module.css'
import { useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserRegister, userAuthenticated, userfullName } from '../../redux/slices/userSlice'
import ModalError from '../ModalError/ModalError';

const RegistrationForm = () => {
  const [ form, setForm ] = useState({
    login: '',
    fullName: '',
    email: '',
    password: '',
    policy: true,
    error: false,
    textMessage: '',
  })
  const { login, fullName, email, password, policy, error, textMessage } = form;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector(state => state.user)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prevForm => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value
    }))

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!policy) {
      alert('Необходимо дать разрешение на обработку персональных данных')
      return
    }
    dispatch(fetchUserRegister(
      form
    )).then(response => {
      if (response.payload != 201){
        setForm(prevForm => ({...prevForm, error: true, textMessage: response.payload}))
      } else {
        dispatch(userAuthenticated())
        dispatch(userfullName(fullName))
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
        <label htmlFor="fullName" className={classes['label']}>Введите Имя и Фамилию</label>
        <input className={classes['input']} id='fullName' name='fullName' type="text" value={fullName} placeholder='Имя и Фамилия' onChange={handleChange} required/>
        <label htmlFor="login">Придумайте логин длиной от 4 до 20 символов, только латинские буквы и цифры</label>
        <input className={classes['input']} id='login' name='login' type="text" value={login} placeholder='Login' onChange={handleChange} required minLength="4" maxLength="20" pattern='^[A-Za-z][A-Za-z0-9]*$'/>
        <label htmlFor="email">Укажите адрес электронной почты</label>
        <input className={classes['input']} id='email' name='email' type="email" value={email} placeholder='E-mail' onChange={handleChange} required pattern='^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'/>
        <label htmlFor="password">Придумайте пароль не менее 6 символов: минимум одна заглавная буква, одна цифра и один специальный символ</label>
        <input className={classes['input']} id='password' name='password' type="text" value={password} placeholder='Пароль' onChange={handleChange} required pattern='^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$'/>
        <label htmlFor="policy">Согласен на обработку персональных данных
          <input id='policy' name='policy' type="checkbox" checked={policy} onChange={handleChange}/>
        </label>
        <button className={classes['button']} type='submit'>Зарегистрироваться</button>
        {loading ? <>ЗАГРУЗКА</>: ''}
      </form>
      <>
        {error ? <ModalError context={ [textMessage, hendleModal] }/> : ''}
      </>
    </>
  )
}

export default RegistrationForm
