import React from "react";
import { Box } from "@chakra-ui/react";

const Body1 = () => {
  return (
    <Box display="flex" p={4}>
      <Box flex={1} marginLeft={20} marginTop="240" textAlign="left">
      <Box  fontSize='6xl' fontWeight={700}>
      <span style={{color:"#46c29d"}}>ONLINE HEATH</span><br/>DOCTOR CONSULTATION
      </Box>
      <Box fontSize='3xl'>
      Our specialist doctors are ready to help you get the care you need, Hassle-free virtual care
      </Box>
     
      </Box>
   
      <Box flex={1} marginRight={10} textAlign="right" fontSize='8xl'> 
        <img src="https://img.freepik.com/free-vector/online-doctor-flat-design_23-2148521415.jpg?w=826&t=st=1680710341~exp=1680710941~hmac=6af90500c51bb4e5d540c55489fbd2e3cd4e462277837ac1f22348ec2088a2a6" alt="imag..." />
      </Box>
    </Box>
  );
};

export default Body1;
