import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

function Messenger() {
  return (
    <Flex direction="row" h="100vh" w="70vw" mt={24} alignItems="stretch">
      <Box w="25%" h="100vh" borderRight="1px solid gray.200" p="4">
        <InputGroup mb="4">
          <InputLeftElement pointerEvents="none" children={<FaSearch />} />
          <Input placeholder="Search user..." />
        </InputGroup>
        <Box overflowY="auto" h="calc(100vh - 120px)">
          <Stack spacing="4">
            <Flex alignItems="center">
              <Avatar
                size="md"
                name="John Doe"
                src="https://bit.ly/dan-abramov"
              />
              <Box ml="4">
                <Heading as="h2" fontSize="lg">
                  John Doe
                </Heading>
                <Box fontSize="sm" color="gray.500">
                  Last message received 5 minutes ago
                </Box>
              </Box>
            </Flex>
            <Flex alignItems="center">
              <Avatar
                size="md"
                name="Jane Smith"
                src="https://bit.ly/dan-abramov"
              />
              <Box ml="4">
                <Heading as="h2" fontSize="lg">
                  Jane Smith
                </Heading>
                <Box fontSize="sm" color="gray.500">
                  Last message sent 10 minutes ago
                </Box>
              </Box>
            </Flex>
          </Stack>
        </Box>
      </Box>
      <Box w="75%" h="100vh" p="4">
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
        <Box overflowY="auto" h="calc(90vh - 200px)" mt="4">
          <Stack spacing="4">
            <Box bg="gray.200" p="2" borderRadius="md" alignSelf="flex-start">
              <Box fontSize="sm" color="gray.500">
                Yesterday, 12:35 PM
              </Box>
              <Box>Hello, how are you?</Box>
            </Box>
            <Box bg="gray.200" p="2" borderRadius="md" alignSelf="flex-end">
              <Box fontSize="sm" color="gray.500">
                Yesterday, 12:37 PM
              </Box>
              <Box>I'm good, thanks. How about you?</Box>
            </Box>
            <Box bg="gray.200" p="2" borderRadius="md" alignSelf="flex-start">
              <Box fontSize="sm" color="gray.500">
                Yesterday, 12:39 PM
              </Box>
              <Box>Doing well, thanks for asking.</Box>
            </Box>
          </Stack>
        </Box>
        <Box mt="4">
          <Textarea placeholder="Type your message..." mb="4" />
          <Button colorScheme="blue">Send</Button>
        </Box>
      </Box>
    </Flex>
  );
}

export default Messenger;
