import React from 'react'
import classes from './modalButton.module.css'

const ModalButton = ({text1, handler1, text2, handler2}) => {
  return (
    <div className={classes['button-conteiner']}>
        <button className={classes["button"]} onClick={handler1}>{text1}</button>
        <button className={classes["button"]} onClick={handler2}>{text2}</button>
    </div>
  )
}

export default ModalButton
