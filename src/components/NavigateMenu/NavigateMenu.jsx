import React from 'react'
import { NavLink } from "react-router-dom";
import classes from './navigateMenu.module.css'

const NavigateMenu = (props) => {
    const { login, exit, registration } = props.refer;
  return (
<ul className={classes['ul']}>
  <li className={classes['li']}><NavLink className={classes['a']} to={login}>Вход</NavLink></li>
  <li className={classes['li']}><NavLink className={classes['a']} to={exit}>Выход</NavLink></li>
  <li className={classes['li']}><NavLink className={classes['a']} to={registration}>Регистрация</NavLink></li>
</ul>
  )
}

export default NavigateMenu
