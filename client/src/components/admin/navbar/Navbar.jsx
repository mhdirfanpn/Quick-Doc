import React from 'react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Box bg="#0A1F29" w="100%" p={4} color="white">
      <Flex>
        <Text fontSize="4xl" fontWeight="bold" ml={6}>
          Quick-Doc
        </Text>
        <Spacer />
        <Box marginRight={30}>
        <Link to="/admin"><MdLogout size={50}/></Link>
       
      
        </Box>
      
      </Flex>
    </Box>
  );
}

export default Navbar;
