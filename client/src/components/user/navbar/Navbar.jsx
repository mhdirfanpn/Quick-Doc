import React from "react";
import { Box, Flex, Spacer, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setLogout } from "../../../redux/userSlice";
import Swal from "sweetalert2";
import { MdLogout } from "react-icons/md";

function Navbar() {
  const userName = localStorage.getItem("userName");
  console.log(userName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken");
        dispatch(setLogout());
        navigate("/");
      }
    });
  };

  return (
    <Box bg="#46c29d" w="100%" p={4} color="white">
      <Flex>
        <Text fontSize="4xl" fontWeight="bold" ml={6}>
          Quick-Doc
        </Text>
        <Spacer />
        <Text fontSize="2xl" fontWeight="bold" mr="60" mt={2}>
          Welcome {userName}
        </Text>
        <Button variant="" color="#e4ede6" mr={4}>
          Home
        </Button>
        <Button variant="" color="#e4ede6" mr={4}>
          About
        </Button>
        <Box marginTop={1}>
        <MdLogout onClick={handleLogout} size={30}/>
       
      
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;
