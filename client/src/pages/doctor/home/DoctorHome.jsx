import React from 'react'
import Navbar from '../../../components/doctor/navbar/Navbar'
import Sidebar from '../../../components/doctor/sidebar/Sidebar'
import DoctorProfile from '../../../components/doctor/profile/DocotorProfile'

const DoctorHome = () => {
  return (
    <>
    <Navbar/>
    <Sidebar/>
    <DoctorProfile/>
    </>
  )
}

export default DoctorHome