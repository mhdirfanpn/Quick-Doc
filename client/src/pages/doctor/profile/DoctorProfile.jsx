import React from 'react'
import Navbar from '../../../components/doctor/navbar/Navbar'
import Sidebar from '../../../components/doctor/sidebar/Sidebar'
import DoctorProfileEdit from '../../../components/doctor/profile/DoctorProfileEdit'
import Timings from '../../../components/doctor/profile/Timings'

const DoctorProfile = () => {
  return (
   <>
   <Navbar/>
    <Sidebar/>
    <DoctorProfileEdit/>
    <Timings/>
   </>
  )
}

export default DoctorProfile