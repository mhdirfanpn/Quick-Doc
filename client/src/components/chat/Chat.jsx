import { Box,Stack } from '@chakra-ui/react'
import React from 'react'

const Chat = () => {
  return (
  <Box>
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
  )
}

export default Chat