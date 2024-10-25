import React from 'react'
import Modal from '../Modal/Modal'
import ModalButton from '../ModalButton/ModalButton';

const ModalDelete = (props) => {
  const { handleDelete, handleModalClose } = props.file;

  return (
    <Modal header={'подтвердите удаление файла'} type={'delete'}>
      <ModalButton text1={'УДАЛИТЬ'} text2={'ОТМЕНА'} handler1={handleDelete} handler2={handleModalClose}/>
    </Modal>
  )
}

export default ModalDelete
