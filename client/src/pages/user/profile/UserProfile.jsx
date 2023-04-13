import React from 'react'
import NavBar from '../../../components/user/navbar/Navbar'
import Footer from '../../../components/user/footer/Footer'
import UserProfileBox from '../../../components/user/profile/UserProfileBox'
import Body1 from '../../../components/user/body1/Body1'
import UserProfileCard from '../../../components/user/profile/userProfileCard'

const UserProfile = () => {
  return (
    <>
    <NavBar/>
    <UserProfileCard/>
    <Footer/>
    </>
  )
}

export default UserProfile