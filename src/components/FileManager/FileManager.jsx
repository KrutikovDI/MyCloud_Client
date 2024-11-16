import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
// import FileDetails from '../FileDetails/FileDetails'
// import ModalRename from '../ModalRename/ModalRename';
// import ModalDelete from '../ModalDelete/ModalDelete';
// import ModalError from '../ModalError/ModalError';
import FileList from '../FileList/FileList';
import classes from './fileManager.module.css';

const FileManager = () => {

    const { token } = useSelector(state => state.user)
    const [ form, setForm ] = useState({
      media: null,
      comment: '',
    });
    const [ uploadStatus, setUploadStatus ] = useState('');
    const [ freshFiles, setFreshFiles ] = useState (0);

    const handleChange = (e) => {
        setUploadStatus('')
        const { name, type, value, files } = e.target;
        type === 'file'
        ? setForm((prevForm) => ({ ...prevForm, [name]: files[0] }))
        : setForm((prevForm) => ({ ...prevForm, [name]: value }))
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!form.media) {
            setUploadStatus('Пожалуйста, выберите файл!')
            return
        };
        const formData = new FormData();
        formData.append('media', form.media);
        formData.append('comment', form.comment);
        try {
          const response = await fetch (import.meta.env.VITE_FILES_URL, {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Token ${token}`
            }            
          })
          if (!response.ok) {
            setUploadStatus('Ошибка при загрузке файла')
          } else {
            setUploadStatus('Файл успешно загружен');
            refreshFile()
          }
            setTimeout(() => {
              setUploadStatus('')
              setForm((prevForm) => ({...prevForm, media: null, comment: ''}))
            }, 2000);
          
        } catch (error) {
          console.error('Ошибка при загрузке файла на сервер:', error)
        }
    };

    const refreshFile = () => {
      setFreshFiles((prevFile) => prevFile + 1)
    }

  return (
    <div>
      <form className={classes['form']} onSubmit={handleSubmit}>
        <label className={classes['label']}>
          Выберите файл для загрузки
          <input type="file" name='media' className={classes['input']} onChange={handleChange}/>
        </label>
        <label className={classes['label']} htmlFor="comment">
          Комментарий к файлу
          <input type="text" name='comment' className={classes['input']} value={form.comment} onChange={handleChange}/>
        </label>
        <div className={classes['submit']}>
          {uploadStatus
          ? <p className={classes['p']}>{uploadStatus}</p>
          : <button className={classes['button']} type='submit'>Загрузить</button>}
        </div>
      </form>
      <FileList token={token} freshFiles={freshFiles}/>
    </div>
  )
}

export default FileManager
