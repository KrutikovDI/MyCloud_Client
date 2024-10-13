import React from 'react'
import { useSelector } from "react-redux";
import NavigateMenu from '../components/NavigateMenu/NavigateMenu';
import FileManager from '../components/FileManager/FileManager';

const HomePage = () => {
  const { fullName } = useSelector(state => state.user)


  return (
    <>
      <nav><NavigateMenu refer={{login: '/', exit: '/login', registration: '/login'}}/></nav>
      <div className='profile'>
        <div className='icon'></div>
        <div>{fullName}</div>
      </div>
      <FileManager/>
      </>
  )
}

export default HomePage
