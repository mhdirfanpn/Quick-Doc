import { Box, Flex, Avatar, Text } from "@chakra-ui/react";

function UserNav() {
  return (
    <Flex align="center" justify="space-between" p="4" bg="gray.100">
      <Box>
        <Avatar name="Irfan" src="" size="md" />
      </Box>
      <Box>
        <Text>Welcome, Irfan </Text>
      </Box>
    </Flex>
  );
}

export default UserNav;
