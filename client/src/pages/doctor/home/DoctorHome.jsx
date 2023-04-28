import React from 'react'
import Layout from '../../../components/doctor/layout/Layout'
import DoctorProfile from '../../../components/doctor/profile/DocotorProfile'
import Timings from '../../../components/doctor/profile/Timings'

const DoctorHome = () => {
  return (
    <>
    <Layout>
    <DoctorProfile/>
    <Timings/>
    </Layout>
   
    </>
  )
}

export default DoctorHome