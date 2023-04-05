import React from 'react'
import { useSelector } from 'react-redux'
import Register from './pages/user/register/Register'
import Login from './pages/user/login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/user/home/Home'
import AdminLogin from './pages/admin/login/AdminLogin'
import AdminHome from './pages/admin/home/AdminHome'
import UserManage from './pages/admin/usersList/UserManage'
import ViewDoctors from './pages/admin/doctorsList/ViewDoctors'
import ManageDoctors from './pages/admin/doctorsRequest/ManageDoctors'
import DoctorRegister from './pages/doctor/register/DoctorRegister'
import DoctorLogin from './pages/doctor/login/DoctorLogin'
import DoctorHome from './pages/doctor/home/DoctorHome'
import DoctorCard from './pages/admin/doctorDetails/DoctorDetails'


const App = () => {
  const userAuth = Boolean(useSelector((state) => state.user.token));

  return (
    <div> 
       <BrowserRouter>
       <Routes>
          <Route path='/' element={!userAuth ? <Login /> : <Home/>}/> 
          <Route path='/signUp' element={<Register />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/home' element={<Home /> } />
          <Route path='/admin' element={<AdminLogin />  } />
          <Route path='/admin-home' element={<AdminHome /> } />
          <Route path='/users-list' element={<UserManage />} />
          <Route path='/doctors-list' element={<ViewDoctors />} />
          <Route path='/manage-doctors' element={<ManageDoctors />} />
          <Route path='/doctor-register' element={<DoctorRegister />} />
          <Route path='/doctor-login' element={<DoctorLogin />} />
          <Route path='/doctor-home' element={ <DoctorHome /> } />
          <Route path='/doctor-card/:doctorId' element={ <DoctorCard /> } />


       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
