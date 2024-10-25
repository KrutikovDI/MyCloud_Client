import React from 'react'
import classes from './modalError.module.css'
import Modal from '../Modal/Modal'

const ModalError = (props) => {
  const  [ textMessage, hendleModal ]  = props.context
  return (
    <Modal header={'ОШИБКА'} type={'error'}>
      <p>{textMessage}</p>
      <button className={classes["close"]} onClick={hendleModal}>ЗАКРЫТЬ</button>
    </Modal>
  )
}

export default ModalError
