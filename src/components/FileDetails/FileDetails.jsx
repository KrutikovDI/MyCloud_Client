import React, { useState } from 'react'
import classes from './fileDetails.module.css'

const FileDetails = (props) => {
    console.log('!!!!!!!!!!!!!!!!.............!!!!!!!!!!!!!!!!')
    console.log(props)
    const { id, media, uploaded_at, comment, size, download_url, last_downloaded, } = props.item.file;
    
    const { handleUpdateFile } = props.item;
    const [ copySuccess, setCopySuccess ] = useState(false)

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
    
    const formatDate = (serverDate) => {
        const date = new Date(serverDate);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = String(date.getUTCFullYear());
        return `${day}.${month}.${year} ${hours}:${minutes}`;
      };

    const media_name = decodeURIComponent(media.split('/').pop()).replace(/__/g, ' ')

    const handleCopyLink = async (link) => {
        try {
            await navigator.clipboard.writeText(link);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 1000);
        } catch (error) {
            console.error('Не удалось скопировать ссылку:', error);
        };
    };
    
  return (
    <div className={classes['field']}>
        <div className={classes['details']}>
            <div className={classes['comment']}>
                <a className={classes['file']} href={download_url} target="_blank" download>{media_name}</a>
            </div>
            <div className={classes['comment']}>Размер файла
                <p className={classes['p']}>{formatBytes(size)}</p>
            </div>
            <div className={classes['comment']}>Дата загрузки
                <p className={classes['p']}>{formatDate(uploaded_at)}</p>
            </div>
            <div className={classes['comment']}>Дата последнего скачивания
                <p className={classes['p']}>{last_downloaded ? formatDate(last_downloaded) : '-'}</p>
            </div>
            <div className={classes['comment']}>Комментарий
                <p className={classes['p']}>{comment}</p>
            </div>
        </div>
        <div className={classes['delete']}>
            <button className={classes['button']} onClick={() => {handleCopyLink(download_url)}}>Копировать ссылку</button>
            {copySuccess && <span className={classes['copySuccess']}>ссылка скопирована</span>}
            <button className={classes['button']} onClick={() => {handleUpdateFile({media_name, id})}}>Переименовать</button>
            <button className={classes['button']} onClick={() => {handleUpdateFile(id)}}>Удалить</button>
        </div>
    </div>
  )
};

export default FileDetails;
