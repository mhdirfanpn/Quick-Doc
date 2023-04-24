import { Box, Text, Stack, Icon } from "@chakra-ui/react";
import { FiHome, FiUsers } from "react-icons/fi";
import { FaUserNurse } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ChatIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Box
      position="absolute"
      marginTop="86"
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
            <Link to="/doctor-home">Profile</Link>
          </Text>
          <Text
            display="flex"
            alignItems="center"
            fontSize="2xl"
            fontWeight="bold"
            mb="6"
          >
            <Icon as={FiUsers} mr="2" />
            <Link to="/setTime">Time Slot</Link>
          </Text>
          <Text
            display="flex"
            alignItems="center"
            fontSize="2xl"
            fontWeight="bold"
            mb="6"
          >
            <Icon as={FaUserNurse} mr="2" />

            <Link to='/doctor-appointment'>Appointment</Link>
          </Text>

          <Text
            display="flex"
            alignItems="center"
            fontSize="2xl"
            fontWeight="bold"
            mb="6"
          >
            <Icon as={ChatIcon} mr="2" />

            <Link to="/doctor/chat"> Chat</Link>
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
