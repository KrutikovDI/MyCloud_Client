import React from 'react'
import { useSelector } from "react-redux";
import NavigateMenu from '../components/NavigateMenu/NavigateMenu';
import FileManager from '../components/FileManager/FileManager';
import IconProfile from '../components/IconProfile/IconProfile';

const HomePage = () => {
  const { fullName, token } = useSelector(state => state.user)


  return (
    <>
      <nav><NavigateMenu refer={{login: '/', exit: '/login', registration: '/login'}}/></nav>
      <IconProfile name={fullName}/>
      <FileManager/>
      </>
  )
}

export default HomePage
