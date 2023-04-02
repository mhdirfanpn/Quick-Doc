import React from "react";
import { Box } from "@chakra-ui/react";

const Body1 = () => {
  return (
    <Box display="flex" p={4}>
      <Box flex={1} marginLeft={20} marginTop={100} textAlign="left">
      <Box  fontSize='6xl' fontWeight={700}>
      <span style={{color:"#46c29d"}}>ONLINE HEATH</span><br/>DOCTOR CONSULTATION
      </Box>
      <Box fontSize='3xl'>
      Our specialist doctors are ready to help you get the care you need, Hassle-free virtual care
      </Box>
     
      </Box>
   
      <Box flex={1} marginRight={10} textAlign="right" fontSize='8xl'> 
        <img src="" alt="imag..." />
      </Box>
    </Box>
  );
};

export default Body1;
