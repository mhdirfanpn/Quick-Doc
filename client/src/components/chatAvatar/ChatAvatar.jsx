import React from 'react'
import { Box, Heading, Flex, Avatar } from "@chakra-ui/react";
const ChatAvatar = () => {
  return (
    <Box position="fixed" bg={"green.500"} w="100%">
        <Flex alignItems="center">
          <Avatar size="md" name="John Doe" src="https://bit.ly/dan-abramov" />
          <Box ml="4">
            <Heading as="h2" fontSize="lg">
              John Doe
            </Heading>
            <Box fontSize="sm" color="gray.500">
              Online
            </Box>
          </Box>
        </Flex>
        </Box>
  )
}

export default ChatAvatar