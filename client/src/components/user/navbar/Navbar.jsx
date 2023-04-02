import React from 'react';
import { Box, Flex, Spacer, Text, Button } from '@chakra-ui/react';

function Navbar() {
  return (
    <Box bg="#46c29d" w="100%" p={4} color="white">
      <Flex>
        <Text fontSize="4xl" fontWeight="bold" ml={6}>
          Quick-Doc
        </Text>
        <Spacer />
        <Button variant="" color="white" mr={4}>
          Home
        </Button>
        <Button variant="" color="white" mr={4}>
          About
        </Button>
        <Button variant="" color="white" mr={4}>
          Contact
        </Button>
      </Flex>
    </Box>
  );
}

export default Navbar;

