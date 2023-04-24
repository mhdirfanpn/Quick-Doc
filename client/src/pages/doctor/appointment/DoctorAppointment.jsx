import React from 'react'
import AppointmentList from '../../../components/doctor/appointment/AppointmentList'
import Navbar from '../../../components/doctor/navbar/Navbar'
import Sidebar from '../../../components/doctor/sidebar/Sidebar'

const DoctorAppointment = () => {
  return (
   <>
   <Navbar/>
   <Sidebar/>
   <AppointmentList/>
   </>
  )
}

export default DoctorAppointment