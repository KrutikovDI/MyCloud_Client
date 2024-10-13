import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import LoginPage from './pages/LoginPage/'
import HomePage from './pages/HomePage/'
import AdminPage from './pages/AdminPage/'

function App() {
    const { isAuthenticated } = useSelector(state => state.user)

    const isAuth = () => {
      return isAuthenticated === true}
    const HomePageRoute = ({ children }) => {
      return isAuth() ? children : <Navigate to='/login'/>
    }

  return (
    <>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<HomePageRoute><HomePage/></HomePageRoute>}/>
      <Route path='/admin' element={<AdminPage/>}/>
    </Routes>
    </>
  )
}

export default App