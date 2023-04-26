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
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const { isOpen: isOpenDoctor, onToggle: onOpenDoctor } = useDisclosure();

  return (
    <Box
      position="absolute"
      left="0"
      top="20"
      h="100vh"
      w="64"
      bg="#6e74ba"
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
            _hover={{ cursor: "pointer" }}
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
            _hover={{ cursor: "pointer" }}
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
            _hover={{ cursor: "pointer" }}
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
              _hover={{ cursor: "pointer" }}
            >
              <Link to="/doctors-list">View all doctors</Link>
              <Link to="/manage-doctors">Doctor request</Link>
            </Stack>
          </Collapse>

          <Text
            display="flex"
            alignItems="center"
            fontSize="2xl"
            fontWeight="bold"
            mb="6"
            _hover={{ cursor: "pointer" }}
            onClick={() => navigate("/appointment")}
          >
            <Icon as={FiUsers} mr="2" />
            Appointment
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
