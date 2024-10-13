import React, { useEffect, useState } from 'react'
import classes from './fileManager.module.css'

const FileManager = () => {

    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('')

    const handleFileSelect = (e) => {
        console.log(e.target.files[0])
        setSelectedFile(e.target.files);
    };
    
    const handleFileUpload = async (e) => {
        e.preventDefault();
        if(!selectedFile) {
            setUploadStatus('Пожалуйста, выберите файл!')
            return
        };
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
          const response = await fetch (import.meta.env.VITE_UPLOAD_URL, {
            methot: 'POST',
            boby: formData,
            headers: {'Content-Type': 'multipart/form-data',},
          })
            if (!response.ok) {
              setUploadStatus('Ошибка при загрузке файла')
            } else {
              setUploadStatus('Файл успешно загружен');
              fetchFiles()
            }
        } catch (error) {
          console.error('Ошибка при загрузке файла на сервер:', error)
        }
    };

    const fetchFiles = () => {
      try {
        const response = fetch (import.meta.env.VITE_UPLOAD_FILES)
        .then(
          setFiles(response.data),
        )
      } catch (error) {
        console.log('ОШИБКА')
        console.error('Ошибка при получении файлов:', error)
      }
    };
    
    const handleDeleteFile = async (fileName) => {
      try {
        await fetch (import.meta.env.VITE_UPLOAD_DELETE, {
          method: 'DELETE',
        })
      } catch (error) {console.error('Ошибка при удалении файла:', error);}
    };

    useEffect(() => {
      fetchFiles();
    }, [])

  return (
    <div>
      <form className={classes['form']} onSubmit={handleFileUpload}>
        <p>

        </p>
        <input className={classes['inputUpload']} type="file" multiple onChange={handleFileSelect}/>
        <button className={classes['button']} type='submit'>Загрузить</button>
        {uploadStatus && <p>{uploadStatus}</p>}
      </form>
      <h2>Список загруженных файлов</h2>
      <ul className={classes['ul']}>
        {files.map((file, i) => (
          <li className={classes['li']} key={i}>
            <a className={classes['a']} href={''} target="_blank">{file}</a>
            <button className={classes['button']} onClick={() => {handleDeleteFile(file)}}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FileManager
