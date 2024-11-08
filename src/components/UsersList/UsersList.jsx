import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

import classes from './usersList.module.css'
import UserDetails from '../UserDetails/UserDetails'


const UsersList = () => {

    const { token } = useSelector(state => state.user)
    const [ form, setForm ] = useState({
        users: [],
        error: null,
    })

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
                setForm((prevForm) => ({...prevForm, error:response_json.detail}))
                console.error(response_json)
            } else {setForm((prevForm) => ({...prevForm, users:response_json}))}
        } catch (error) {console.error('Ошибка при получении файлов:', error)}
    };

    const handleUserUpdate = async (data) => {
      console.log(data)
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
    } catch (error) {console.error('Ошибка при обновлении данных:', error)}
  };

    useEffect(() => {
        fetchUsersList();
      }, [])

  return (
    <div className={classes['list']}>
        <h2>Список пользователей</h2>
        <ul className={classes['ul']}>
        {form.users.map((user, i) => (
          <li className={classes['li']} key={i}>
            <UserDetails
            item={user}
            handler={handleUserUpdate}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList
