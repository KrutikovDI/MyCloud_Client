import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import FileDetails from '../FileDetails/FileDetails'
import ModalRename from '../ModalRename/ModalRename';
import ModalDelete from '../ModalDelete/ModalDelete';
import ModalError from '../ModalError/ModalError';
import classes from './fileManager.module.css';

const FileManager = () => {

    const { login, token } = useSelector(state => state.user)
    const [ form, setForm ] = useState({
      media: null,
      comment: '',
      updateFile: null,
      deleteFile: null,
      error: null,
    });
    const [ files, setFiles ] = useState([])
    const [ uploadStatus, setUploadStatus ] = useState('');

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
            fetchFiles()
          }
            setTimeout(() => {
              setUploadStatus('')
              setForm((prevForm) => ({...prevForm, media: null, comment: ''}))
            }, 2000);
          
        } catch (error) {
          console.error('Ошибка при загрузке файла на сервер:', error)
        }
    };

    const fetchFiles = async () => {
      try {
        const response = await fetch (import.meta.env.VITE_FILES_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        const response_json = await response.json()
        if (response.status != 200) {
          setForm((prevForm) => ({...prevForm, error: response_json.detail}))
          console.error(response_json)
        } else {
          setFiles(response_json)
        }
      } catch (error) {console.error('Ошибка при получении файлов:', error)}
    };

    const handleUpdateFile = (file) => {
      if (file.media_name) {
        setForm((prevForm) => ({...prevForm, renameFile: file}))
      } else {
        setForm((prevForm) => ({...prevForm, deleteFile: file}))
      }      
    };

    const handleRename = async (data) => {
      try {
        const response = await fetch (import.meta.env.VITE_FILES_URL + data.id + '/rename/', {
          method: 'POST',
          body: JSON.stringify({ newName: data.name }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });
      } catch (error) {
        console.error('Ошибка обновления имени файла:', error)
      };
      setForm((prevForm) => ({...prevForm, renameFile: null}));
      fetchFiles();
    };
    

    const handleDelete = async () => {
      try {
        await fetch (import.meta.env.VITE_FILES_URL + form.deleteFile + '/', {
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${token}`,
          }
        });
        fetchFiles();
      } catch (error) {
        console.error('Ошибка при удалении файла:', error);
        setForm((prevForm) => ({...prevForm, error: 'Ошибка при удалении файла'}))
      }
      setForm((prevForm) => ({...prevForm, deleteFile: null}));
      fetchFiles();
    };

    const handleModalClose = () => {
      setForm((prevForm) => ({...prevForm, renameFile: null, deleteFile: null, error: null}))
    };

    useEffect(() => {
      fetchFiles();
    }, [])

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
      {form.renameFile ? <ModalRename file={{
        file: form.renameFile,
        handleRename,
        handleModalClose,
        }}/> : ''}
      {form.deleteFile ? <ModalDelete file={{
        handleDelete,
        handleModalClose,
      }}/> : ''}
      {form.error ? <ModalError context={[
        form.error, handleModalClose
        ]}/> : ''}
      <h2>Список загруженных файлов</h2>
      <ul className={classes['ul']}>
        {files.map((file, i) => (
          <li className={classes['li']} key={i}>
            <FileDetails item={{
              file,
              handleUpdateFile,
              }}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FileManager
