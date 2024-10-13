import React from 'react'
import classes from './modalError.module.css'

const ModalError = (props) => {
  const  [ textMessage, hendleModal ]  = props.context
  return (
<div id="myModal" className={classes['modal']}>
  <div className={classes["modal-content"]}>
    <div className={classes["modal-header"]}>
      <span className={classes["close"]} onClick={hendleModal}>&times;</span>
      <h2>ОШИБКА</h2>
    </div>
    <div className={classes["modal-body"]}>
      <p>{textMessage}</p>
    </div>
    <div className={classes["modal-footer"]}>
      <h3>Попробуйте еще раз</h3>
    </div>
  </div>
</div>
  )
}

export default ModalError
