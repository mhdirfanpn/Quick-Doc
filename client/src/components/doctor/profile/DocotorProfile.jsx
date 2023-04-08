import { Box, Image, Badge, Text, VStack, HStack, Flex, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

function DoctorProfile() {
  return (
    <Box
      marginLeft="330"
      marginTop={10}
      bg="white"
      rounded="lg"
      border="1px"
      borderColor="gray.200"
      maxWidth="1400"
      p={4}
      shadow="md"
      dark={{ bg: "gray.800", borderColor: "gray.700" }}
    >
      <Flex justify="space-between" align="center">
        <Image src="https://www.asterhospitals.in/sites/default/files/styles/webp/public/2022-02/dr-anil-kumar-r-best-cardiologist-in-kochi.jpg.webp?itok=CntgMaxn/400x400" alt="Dr. Jane Smith" mb="4" />

        <IconButton aria-label="Edit profile" icon={<EditIcon />} size="sm" marginBottom="500"/>
      </Flex>

      <VStack spacing={1} align="left">
        <Text fontWeight="bold" fontSize="2xl">
          Dr. Jane Smith
        </Text>

        <Badge colorScheme="teal">Pediatrician</Badge>

        <Text fontSize="md" color="gray.600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel faucibus sapien. Donec suscipit erat vel mauris varius, non semper ex bibendum. Integer convallis, dolor at lobortis elementum, justo erat aliquam urna, in lobortis velit urna sit amet ex. Sed eleifend nulla et nisi euismod molestie.
        </Text>
      </VStack>

      <HStack mt="4" spacing={3}>
        <Text fontSize="sm" color="gray.600">
          Phone:
        </Text>
        <Text fontSize="sm">123-456-7890</Text>
      </HStack>

      <HStack mt="2" spacing={3}>
        <Text fontSize="sm" color="gray.600">
          Email:
        </Text>
        <Text fontSize="sm">ane.smith@example.com</Text>
      </HStack>
    </Box>
  );
}

export default DoctorProfile;
