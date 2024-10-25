import React, { useState } from 'react'
import classes from './modalRename.module.css'
import Modal from '../Modal/Modal'
import ModalButton from '../ModalButton/ModalButton'

const ModalRename = (props) => {
    const  { media_name, id }  = props.file.file;
    const { handleRename, handleModalClose }  = props.file;
    const [ form, setForm ] = useState({
        name: media_name,
        id: id,
    });
    const handleChange = (e) => {
        const { name, value, } = e.target;
        setForm((prevForm) => ({...prevForm, [name]:value}))
    }

  return (
    <Modal header={'введите новое имя файла'} type={'rename'}>
      <input className={classes['input']} type="text" value={form.name} name='name' onChange={handleChange}/>
      <ModalButton text1={'ПЕРЕИМЕНОВАТЬ'} text2={'ОТМЕНА'} handler1={() => {handleRename(form)}} handler2={handleModalClose}/>
    </Modal>
  )
}

export default ModalRename
