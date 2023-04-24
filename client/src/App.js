import './App.css'
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
import UserProfile from './pages/user/profile/UserProfile'
import UserProfileEdit from './pages/user/profile/UserProfileEdit'
import DoctorProfile from './pages/doctor/profile/DoctorProfile'
import { useSelector } from 'react-redux'
import OtpLogin from './pages/user/login/OtpLogin'
import SpinnerLoader from './components/spinner/SpinnerLoader'
import ScheduleAppointment from './pages/doctor/ScheduleTime/ScheduleAppointment'
import DoctorDetails from './pages/user/doctorDetails/DoctorDetails'
import ScrollToTop from './scrollTop/ScrollTop'
import AvailableTime from './pages/user/availableTime/AvailableTime'
import Payment from './pages/user/payment/Payment'
import OrderSuccess from './pages/user/orderSuccess/OrderSuccess'
import Sessions from './pages/user/sessions/Sessions'
import Appointment from './pages/admin/appointments/Appointment'
import DoctorAppointment from './pages/doctor/appointment/DoctorAppointment'



console.log(process.env.REACT_APP_API_KEY);

const App = () => {

  const {loading} = useSelector(state => state.spinner)
  
  return (
    <div> 
       <BrowserRouter>

       <ScrollToTop>

        {loading ? <SpinnerLoader/> : 


       <Routes>

  {/* ========================================USER ROUTES============================================================= */}        

          <Route path='/' element={
            <AuthUser>
              <Login/>
            </AuthUser>
          }/>

          <Route path='/otp' element={
            <AuthUser>
              <OtpLogin/>
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

          <Route path='/profile' element={
            <AuthorizeUser>
              <UserProfile/>
            </AuthorizeUser>
          }/>

          <Route path='/profile/edit' element={
            <AuthorizeUser>
              <UserProfileEdit/>
            </AuthorizeUser>
          }/>

          <Route path='/doctorDetails/:doctorId' element={
            <AuthorizeUser>
              <DoctorDetails/>
            </AuthorizeUser>
          }/>

          <Route path='/checkAvailability/:doctorId' element={
            <AuthorizeUser>
              <AvailableTime/>
            </AuthorizeUser>
          }/>

          <Route path='/handlePay' element={
            <AuthorizeUser>
              <Payment/>
            </AuthorizeUser>
          }/>

          <Route path='/order_success' element={
            <AuthorizeUser>
              <OrderSuccess/>
            </AuthorizeUser>
          }/>

          <Route path='/userSessions' element={
            <AuthorizeUser>
              <Sessions/>
            </AuthorizeUser>
          }/>


  {/* ========================================DOCTOR ROUTES============================================================= */}

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


          <Route path='/doctor-profile' element={
            <AuthorizeDoctor>
              <DoctorProfile /> 
            </AuthorizeDoctor>
          } />

          <Route path='/setTime' element={
            <AuthorizeDoctor>
              <ScheduleAppointment /> 
            </AuthorizeDoctor>
          } />

          <Route path='/doctor-appointment' element={
            <AuthorizeDoctor>
              <DoctorAppointment /> 
            </AuthorizeDoctor>
          } />


  {/* ========================================ADMIN ROUTES============================================================= */}         
         
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

          <Route path='/appointment' element={
            <AuthorizeAdmin>
              <Appointment />
            </AuthorizeAdmin>
          } />

          
       </Routes>


        }

      </ScrollToTop>

       </BrowserRouter>
    </div>
  )
}

export default App
