import React from 'react'
import Navbar from '../../../components/admin/navbar/Navbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import DoctorCard from '../../../components/admin/doctorCard/DoctorCard'

const DoctorDetails = () => {
  return (
        <>
        <Navbar/>
        <Sidebar/>
        <DoctorCard/>
        </>
  )
}

export default DoctorDetails