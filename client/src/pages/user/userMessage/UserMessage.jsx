import React from 'react'
import Messenger from '../../../components/user/messenger/Messenger'
import NavBar from '../../../components/user/navbar/Navbar'
import Footer from '../../../components/user/footer/Footer'

const UserMessage = () => {
  return (
    <>
    <NavBar/>
    <Messenger isUser={true}/>
    <Footer/>
    </>
  )
}

export default UserMessage