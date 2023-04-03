import React from 'react'
import DoctorsList from '../../../components/admin/doctorsList/DoctorsList'
import Navbar from '../../../components/admin/navbar/Navbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'

const ViewDoctors = () => {
  return (
    <>
    <Navbar/>
    <Sidebar/>
    <DoctorsList/>
    </>
  )
}

export default ViewDoctors