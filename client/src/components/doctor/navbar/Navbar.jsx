import React from 'react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDoctorLogout } from '../../../redux/doctorSlice';
import { MdLogout } from "react-icons/md";
import Swal from 'sweetalert2';

function Navbar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
 

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("doctorToken")
        dispatch(setDoctorLogout());
        navigate('/doctor-login')
      }
    });
  };


  return (
    <Box bg="#051766" w="100%" p={4} color="white">
      <Flex>
        <Text fontSize="4xl" fontWeight="bold" ml={6}>
          Quick-Doc
        </Text>
        <Spacer />
        <Box marginRight={30}>
        <MdLogout onClick={handleLogout} size={50}/>
      
        </Box>
      
      </Flex>
    </Box>
  );
}

export default Navbar;