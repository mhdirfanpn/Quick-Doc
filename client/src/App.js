import React from 'react'
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
import AuthorizeAdmin from './protected/admin/AuthorizeAdmin'
import AuthAdmin from './protected/admin/AuthAdmin'
import AuthorizeUser from './protected/user/AuthorizeUser'
import AuthUser from './protected/user/AuthUser'
import AuthorizeDoctor from './protected/doctor/AuthorizeDoctor'
import AuthDoctor from './protected/doctor/AuthDoctor'
import { useSelector } from 'react-redux'


const App = () => {
  

  return (
    <div> 
       <BrowserRouter>
       <Routes>
          

          <Route path='/' element={
            <AuthUser>
              <Login/>
            </AuthUser>
          }/>

          <Route path='/signUp' element={
            <AuthUser>
              <Register/>
            </AuthUser>
          }/>   

          <Route path='/home' element={
            <AuthorizeUser>
              <Home/>
            </AuthorizeUser>
          }/>

          <Route path='/admin' element={
            <AuthAdmin>
              <AdminLogin />
            </AuthAdmin>
          } />

          <Route path='/admin-home' element={
            <AuthorizeAdmin>
              <AdminHome />
            </AuthorizeAdmin>
          } />



          <Route path='/users-list' element={
            <AuthorizeAdmin>
              <UserManage />
            </AuthorizeAdmin>
          } />


          <Route path='/doctors-list' element={
            <AuthorizeAdmin>
              <ViewDoctors />
            </AuthorizeAdmin>
          } />

          <Route path='/manage-doctors' element={
            <AuthorizeAdmin>
              <ManageDoctors />
            </AuthorizeAdmin>
          } />

          <Route path='/doctor-card/:doctorId' element={
            <AuthorizeAdmin>
              <DoctorCard />
            </AuthorizeAdmin>
          } />

          
          <Route path='/doctor-login' element={
            <AuthDoctor>
             <DoctorLogin />
            </AuthDoctor>
          } />

           
        <Route path='/doctor-register' element={
            <AuthDoctor>
               <DoctorRegister />
            </AuthDoctor>
          } />

          <Route path='/doctor-home' element={
            <AuthorizeDoctor>
              <DoctorHome /> 
            </AuthorizeDoctor>
          } />





       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
