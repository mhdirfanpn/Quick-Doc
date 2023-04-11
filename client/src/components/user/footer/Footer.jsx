import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  FormControl,
  Input,
  useColorModeValue,
  HStack,
  Button,
} from "@chakra-ui/react";

const ListHeader = () => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {/* {children} */}
    </Text>
  );
};

const Footer = () => {
  return (
    <Box
      marginTop={5}
      bg={useColorModeValue("#46c29d", "gray.900")}
      color={useColorModeValue("white")}
      bottom={0}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href={"#"}>About Us</Link>
            <Link href={"#"}>Blog</Link>
            <Link href={"#"}>Careers</Link>
            <Link href={"#"}>Contact Us</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"#"}>Help Center</Link>
            <Link href={"#"}>Safety Center</Link>
            <Link href={"#"}>Community Guidelines</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Link href={"#"}>Cookies Policy</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Terms of Service</Link>
            <Link href={"#"}>Law Enforcement</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>

            <FormControl id="password">
              <HStack>
                <Input bg="white" type="text" />
                <Button color={"green.300"}>Subscribe</Button>
              </HStack>
            </FormControl>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Install App</ListHeader>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>Quick-Doc</Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
