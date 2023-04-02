import React from 'react'
import Register from './pages/user/register/Register'
import Login from './pages/user/login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/user/home/Home'
import AdminLogin from './pages/admin/login/AdminLogin'
import AdminHome from './pages/admin/home/AdminHome'
import UserManage from './pages/admin/usersList/UserManage'
import UsersList from './components/admin/usersList/UsersList'
import ViewDoctors from './pages/admin/doctorsList/ViewDoctors'
import ManageDoctors from './pages/admin/doctorsRequest/ManageDoctors'
import DoctorRegister from './pages/doctor/register/DoctorRegister'
import DoctorLogin from './pages/doctor/login/DoctorLogin'
import DoctorHome from './pages/doctor/home/DoctorHome'


const App = () => {
  return (
    <div>
       <BrowserRouter>
       <Routes>
       
          <Route path='/signUp' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin-home' element={<AdminHome />} />
          <Route path='/users-list' element={<UserManage />} />
          <Route path='/doctors-list' element={<ViewDoctors />} />
          <Route path='/manage-doctors' element={<ManageDoctors />} />
          <Route path='/doctor-register' element={<DoctorRegister />} />
          <Route path='/doctor-login' element={<DoctorLogin />} />
          <Route path='/doctor-home' element={<DoctorHome />} />


       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
