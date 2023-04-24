import { Box, Flex, Avatar, Text } from "@chakra-ui/react";
import jwtDecode from "jwt-decode";

function UserNav() {

  let userData = jwtDecode(localStorage.getItem("userToken"))
 
  return (
    <Flex align="center" justify="space-between" p="4" bg="gray.100">
      <Box>
        <Avatar name={userData.name} src="" size="md" />
      </Box>
      <Box>
        <Text>Welcome, {userData.name} </Text>
      </Box>
    </Flex>
  );
}

export default UserNav;
