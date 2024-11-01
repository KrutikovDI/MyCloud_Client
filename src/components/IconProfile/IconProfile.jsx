import React from 'react'
import classes from './iconProfile.module.css'

const IconProfile = (props) => {
    const { name, superuser=false } = props
    console.log(name)
    console.log(superuser)
  return (
    <div className={classes['profile']}>
        {superuser
        ? <div className={`${classes['icon']} ${classes['admin']}`}>администратор</div>
        : <div className={`${classes['icon']} ${classes['user']}`}>пользователь</div>}
        <div>{name}</div>
  </div>
  )
}

export default IconProfile
