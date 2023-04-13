import React from 'react'
import Navbar from '../../../components/doctor/navbar/Navbar'
import Sidebar from '../../../components/doctor/sidebar/Sidebar'
import DoctorProfileEdit from '../../../components/doctor/profile/DoctorProfileEdit'

const DoctorProfile = () => {
  return (
   <>
   <Navbar/>
    <Sidebar/>
    <DoctorProfileEdit/>
   </>
  )
}

export default DoctorProfile