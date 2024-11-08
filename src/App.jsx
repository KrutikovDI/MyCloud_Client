import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import LoginPage from './pages/LoginPage/'
import HomePage from './pages/HomePage/'

function App() {
    const { is_active } = useSelector(state => state.user)

    const isAuth = () => {
      return is_active === true}
    const HomePageRoute = ({ children }) => {
      return isAuth() ? children : <Navigate to='/login'/>
    }

  return (
    <>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<HomePageRoute><HomePage/></HomePageRoute>}/>
    </Routes>
    </>
  )
}

export default App
