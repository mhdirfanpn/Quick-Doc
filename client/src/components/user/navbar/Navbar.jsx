import React from 'react';
import { Box, Flex, Spacer, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../../redux/userSlice';

function Navbar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout=(e)=>{
    localStorage.removeItem("userToken")
    dispatch(setLogout());
    navigate('/login')
  }
  return (
    <Box bg="#46c29d" w="100%" p={4} color="white">
      <Flex>
        <Text fontSize="4xl" fontWeight="bold" ml={6}>
          Quick-Doc
        </Text>
        <Spacer />
        <Button variant="" color="white" mr={4}>
          Home
        </Button>
        <Button variant="" color="white" mr={4}>
          About
        </Button>
        <Button variant="" color="white" mr={4} onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
}

export default Navbar;

