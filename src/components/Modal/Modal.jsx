import React from 'react'
import classes from './modal.module.css'

const Modal = ({header, type, children}) => {
  return (
<div id="myModal" className={classes['modal']}>
  <div className={`${classes['modal-content']} ${classes[type]}`}>
    <div className={`${classes['modal-header']} ${classes[type]}`}>
      <h2>{header}</h2>
    </div>
    <div className={classes["modal-body"]}>
      {children}
    </div>
  </div>
</div>
  )
}

export default Modal
