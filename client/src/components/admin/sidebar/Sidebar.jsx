import {
  Box,
  Text,
  Stack,
  Icon,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers } from "react-icons/fi";
import { FaUserNurse } from "react-icons/fa";

const Sidebar = () => {
  const { isOpen, onToggle } = useDisclosure();

  const { isOpen: isOpenDoctor, onToggle: onOpenDoctor } = useDisclosure();

  return (
    <Box
      position="fixed"
      marginTop={20}
      left="0"
      top="0"
      h="100vh"
      w="64"
      bg="#0A1F29"
      color="#b9c9be"
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
            Home
          </Text>
          <Text
            display="flex"
            alignItems="center"
            fontSize="2xl"
            fontWeight="bold"
            mb="6"
            onClick={onToggle}
          >
            <Icon as={FiUsers} mr="2" />
            Users
          </Text>
          <Collapse in={isOpen} animateOpacity>
            <Stack
              mt="2"
              pl="4"
              borderLeft="1px solid white"
              spacing="2"
              mb="6"
            >
              <Link to="/users-list">View all users</Link>
            </Stack>
          </Collapse>
          <Text
            display="flex"
            alignItems="center"
            fontSize="2xl"
            fontWeight="bold"
            mb="6"
            onClick={onOpenDoctor}
          >
            <Icon as={FaUserNurse} mr="2" />
            Doctors
          </Text>
          <Collapse in={isOpenDoctor} animateOpacity>
            <Stack
              mt="2"
              pl="4"
              borderLeft="1px solid white"
              spacing="2"
              mb="6"
            >
              <Link to="/doctors-list">View all doctors</Link>
              <Link to="/manage-doctors">Doctor request</Link>
            </Stack>
          </Collapse>
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
