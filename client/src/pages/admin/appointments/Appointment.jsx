import React from 'react'
import AppointmentList from '../../../components/admin/appointmentList/AppointmentList'
import Navbar from '../../../components/admin/navbar/Navbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'

const Appointment = () => {
  return (
   <>
       <Navbar/>
    <Sidebar/>
   <AppointmentList/>
   </>
  )
}

export default Appointment