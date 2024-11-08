import React from 'react'
import classes from './iconProfile.module.css'

const IconProfile = (props) => {
    const { name, is_superuser=false } = props
  return (
    <div className={classes['profile']}>
        {is_superuser
        ? <div className={`${classes['icon']} ${classes['admin']}`}>администратор</div>
        : <div className={`${classes['icon']} ${classes['user']}`}>пользователь</div>}
        <div>{name}</div>
  </div>
  )
}

export default IconProfile
