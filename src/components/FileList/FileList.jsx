import React, { useEffect, useState } from 'react'

import FileDetails from '../FileDetails/FileDetails'
import ModalRename from '../ModalRename/ModalRename';
import ModalDelete from '../ModalDelete/ModalDelete';
import ModalError from '../ModalError/ModalError';

import classes from './fileList.module.css'


const FileList = ({token, freshFiles, userId, fullName}) => {
  const [ files, setFiles ] = useState([])

  const [ form, setForm ] = useState({
      renameFile: null,
      deleteFile: null,
      error: null,
    });

  const fetchFiles = async () => {
    try {
      const response = await fetch (userId === undefined ? import.meta.env.VITE_FILES_URL : `${import.meta.env.VITE_FILES_URL}?user=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
  
  const handleUpdateFile = (data) => {
    if (data.media_name) {
      setForm((prevForm) => ({...prevForm, renameFile: data}))
    } else {
      setForm((prevForm) => ({...prevForm, deleteFile: data}))
    }      
  };
  
  const handleRename = async (data) => {
    console.log(import.meta.env.VITE_FILES_URL + data.id + '/rename/')
    console.log(`новое название ${data.name}`)
    try {
      const response = await fetch (import.meta.env.VITE_FILES_URL + data.id + '/rename/', {
        method: 'POST',
        body: JSON.stringify({ newName: data.name }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      console.log(await response.json())
    } catch (error) {
      console.error('Ошибка обновления имени файла:', error)
    };
    setForm((prevForm) => ({...prevForm, renameFile: null}));
    fetchFiles();
  };
  
  
  const handleDelete = async () => {
    try {
      await fetch (import.meta.env.VITE_FILES_URL + form.deleteFile, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      fetchFiles();
    } catch (error) {console.error('Ошибка при удалении файла:', error);
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
  }, [freshFiles]);

  return (
    <>
        {form.renameFile && <ModalRename file={{
            file: form.renameFile,
            handleRename,
            handleModalClose,
            }}/>}
        {form.deleteFile && <ModalDelete file={{
            handleDelete,
            handleModalClose,
        }}/>}
        {form.error && <ModalError context={[
            form.error, handleModalClose
        ]}/>}
        <h2>Список загруженных файлов {userId && `пользователя: ${fullName}`}</h2>
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
    </>
  )
}

export default FileList
