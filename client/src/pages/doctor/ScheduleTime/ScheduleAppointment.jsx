import React from 'react'
import TimeSlot from '../../../components/doctor/appointment/setTime'
import Navbar from '../../../components/doctor/navbar/Navbar'
import Sidebar from '../../../components/doctor/sidebar/Sidebar'


const ScheduleAppointment = () => {
  return (
    <>
    <Navbar/>
    <Sidebar/>
    <TimeSlot/>
    </>
  )
}

export default ScheduleAppointment