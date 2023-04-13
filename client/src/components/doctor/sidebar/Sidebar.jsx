import {
    Box,
    Text,
    Stack,
    Icon,
      } from "@chakra-ui/react";
  import { FiHome, FiUsers } from "react-icons/fi";
  import { FaUserNurse } from "react-icons/fa";
  
  const Sidebar = () => {
   
  
    return (
      <Box
      position="absolute"
      marginTop='86'
      left="0"
      top="0"
      h="100vh"
      w="25"
      bg="#051766"
      color="white"
      px="8"
      py="6"
      >
        <Stack spacing="7" mt="7">
          <Box>
            <Text
              display="flex"
              fontSize="2xl"
              alignItems="center"
              fontWeight="bold"
              mb="6"
            >
              <Icon as={FiHome} mr="2" />
              Profile
            </Text>
            <Text
              display="flex"
              alignItems="center"
              fontSize="2xl"
              fontWeight="bold"
              mb="6"
           
            >
              <Icon as={FiUsers} mr="2" />
              Appointment
            </Text>
            <Text
              display="flex"
              alignItems="center"
              fontSize="2xl"
              fontWeight="bold"
              mb="6"
                         >
              <Icon as={FaUserNurse} mr="2" />
             Session
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  };
  
  export default Sidebar;
  