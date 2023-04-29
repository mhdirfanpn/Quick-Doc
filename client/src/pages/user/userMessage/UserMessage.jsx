import React from 'react'
import Messenger from '../../../components/user/messenger/Messenger'
import NavBar from '../../../components/user/navbar/Navbar'
import Footer from '../../../components/user/footer/Footer'
import ChatNavBar from '../../../components/user/navbar/UserNav'

const UserMessage = () => {
  return (
    <>
    <ChatNavBar/>
    <Messenger isUser={true}/>    </>
  )
}

export default UserMessage