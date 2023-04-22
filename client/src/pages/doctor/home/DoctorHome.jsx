import React from 'react'
import Navbar from '../../../components/doctor/navbar/Navbar'
import Sidebar from '../../../components/doctor/sidebar/Sidebar'
import DoctorProfile from '../../../components/doctor/profile/DocotorProfile'
import Timings from '../../../components/doctor/profile/Timings'

const DoctorHome = () => {
  return (
    <>
    <Navbar/>
    <Sidebar/>
    <DoctorProfile/>
    <Timings/>
    </>
  )
}

export default DoctorHome