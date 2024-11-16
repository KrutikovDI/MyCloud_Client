import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import classes from './usersList.module.css';
import UserDetails from '../UserDetails/UserDetails';
import ModalDelete from '../ModalDelete/ModalDelete';
import FileList from '../FileList/FileList';


const UsersList = () => {

  const { token } = useSelector(state => state.user);
  const [ freshFiles, setFreshFiles ] = useState (0);
  const [ form, setForm ] = useState({
      users: [],
      error: null,
      delete: null,
      selectedFullName: null,
      selectedUserId: null,
      renderingFiles: false,
  });

  const fetchUsersList = async () => {
      try {
          const response = await fetch(import.meta.env.VITE_USERS_URL, {
              method: 'GET',
              headers: {
                'Authorization': `Token ${token}`,
              },
          });
          const response_json = await response.json()
          if (response.status != 200) {
              setForm((prevForm) => ({...prevForm, error: response_json.detail}))
              console.error(response_json)
          } else {setForm((prevForm) => ({...prevForm, users: response_json}))}
      } catch (error) {console.error('Ошибка при получении файлов:', error)}
  };

  const fetchUpdate = async (data) => {
    try {
      const response = await fetch(import.meta.env.VITE_USERS_URL + data.id + '/', {
          method: 'PUT',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            is_superuser: !data.is_superuser,
            password: data.password,
            fullName: data.fullName,
            login: data.login,
          }),
      });
      const response_json = await response.json()
      if (response.status != 200) {
          console.error(response_json)
      } else {fetchUsersList()}
    } catch (error) {console.error('Ошибка при обновлении пользователя:', error)}
  };

  const fetchDeleteUser = async (data) => {
    try {
      await fetch(import.meta.env.VITE_USERS_URL + data + '/', {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      fetchUsersList()
    } catch (error) {console.error('Ошибка при удалении пользователя:', error)}
  };

  const handleDelete = () => {
    fetchDeleteUser(form.delete)
    setForm((prevForm) => ({...prevForm, delete: null}))
  }

  const handleModalClose = () => {
    setForm((prevForm) => ({...prevForm, delete: null}))
  }

  const handleUpdateUser = async (data) => {
    if (data.own === '1') {
      fetchUpdate(data);
    } else if (data.own === '2') {
      setForm((prevForm) => ({...prevForm, selectedFullName: data.fullName, selectedUserId: data.id, renderingFiles: true}))
      refreshFile()
    } else if (data.own === '3') {
      setForm((prevForm) => ({...prevForm, delete: data.id}))
    }
  };

  const refreshFile = () => {
    setFreshFiles((prevFile) => prevFile + 1)
  }

  useEffect(() => {
      fetchUsersList();
    }, []);

  return (
    <>
      <div>
        <h2>Список пользователей</h2>
        <ul>
        {form.users.map((user, i) => (
          <li key={i}>
            <UserDetails
            item={user}
            handler={handleUpdateUser}
            />
          </li>
        ))}
        {form.delete && <ModalDelete file={{
        handleDelete,
        handleModalClose,
      }}/>}
      </ul>
    </div>
    {form.renderingFiles && <FileList token={token} freshFiles={freshFiles} userId={form.selectedUserId} fullName={form.selectedFullName}/>}
    </>
  )
}

export default UsersList
