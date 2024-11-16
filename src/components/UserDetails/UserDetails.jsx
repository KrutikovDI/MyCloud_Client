import React from 'react'
import { useSelector } from "react-redux";
import classes from './userDetails.module.css'
import Modaldelete from '../ModalDelete/ModalDelete';

const UserDetails = (props) => {
  const { fullName, login, email, is_superuser, media_count, media_size, id, password } = props.item
  const handler = props.handler

  const formatBytes = (bytes, decimals = 2) => {
      if (bytes === 0) {
          return '0';
      } else {
          let k = 1024;
          let dm = decimals < 0 ? 0 : decimals;
          let sizes = ['байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
          let i = Math.floor(Math.log(bytes) / Math.log(k));
          return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
      }
  };

  return (
    <div className={classes['user']}>
      <label>полное имя:<input type="text" className={classes['longText']} disabled value={fullName}/></label>
      <label>логин:<input type="text" className={classes['middleText']} disabled value={login}/></label>
      <label>почта:<input type="text" className={classes['longText']} disabled value={email}/></label>
      <label>кол-во файлов:<input type="text" className={classes['shortText']} disabled value={media_count}/></label>
      <label>размер файлов:<input type="text" className={classes['middleText']} disabled value={media_size ? formatBytes(media_size) : '0' }/></label>
      <label>админ:<input type="checkbox" checked={is_superuser} disabled/></label>
      <input type="button" className={classes['button']} value={is_superuser ? 'отменить админ-права' : 'выдать админ-права'} onClick={() => {handler({own: '1', id, is_superuser, fullName, login, password})}}/>
      <input type='button' className={classes['button']} value={'медиафайлы'} onClick={() => {handler({own: '2', id, fullName})}}/>
      {(useSelector(state => state.user)).login != login && <input type="button" className={classes['button']} value={'удалить пользователя'} onClick={() => {handler({own: '3', id})}}/>}
    </div>
  )
}

export default UserDetails
