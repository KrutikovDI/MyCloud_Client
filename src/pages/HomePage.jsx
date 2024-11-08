import React from 'react'
import { useSelector } from "react-redux";
import NavigateMenu from '../components/NavigateMenu/NavigateMenu';
import FileManager from '../components/FileManager/FileManager';
import IconProfile from '../components/IconProfile/IconProfile';
import UsersList from '../components/UsersList/UsersList'

const HomePage = () => {
  const { fullName, is_superuser } = useSelector(state => state.user)


  return (
    <>
      <nav><NavigateMenu refer={{login: '/', exit: '/login', registration: '/login'}}/></nav>
      <IconProfile name={fullName} is_superuser={is_superuser}/>
      {is_superuser && <UsersList/>}
      <FileManager/>
      </>
  )
}

export default HomePage
