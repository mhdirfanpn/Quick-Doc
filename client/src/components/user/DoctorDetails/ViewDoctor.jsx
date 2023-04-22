import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
    Button,
  } from "@chakra-ui/react";
  import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
  } from "react-icons/io5";
  import { ReactElement } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import axios from "../../../utils/axios";
  import { GET_DOCTOR } from "../../../utils/ConstUrls";
  
  const Feature = ({ text, icon, iconBg }) => {
    return (
      <Stack direction={"row"} align={"center"}>
        <Flex
          w={8}
          h={8}
          align={"center"}
          justify={"center"}
          rounded={"full"}
          bg={iconBg}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };
  
  export default function ViewDoctor() {
    const [doctor, setDoctor] = useState("");
    console.log(doctor);
    const params = useParams();
    const navigate = useNavigate();
  
    const token = localStorage.getItem("userToken");
  
    useEffect(() => {
      getDoctorsDetails();
    }, []);
  
    const getDoctorsDetails = async () => {
      try {
        axios
          .get(`${GET_DOCTOR}/${params.doctorId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log(response.data.doctor);
            setDoctor(response.data.doctor);
          })
          .catch((err) => {
            console.log(err, "catch error in doctorFetching");
          });
      } catch (err) {
        console.log(err);
      }
    };

    const checkAvailability=(id)=>{
          console.log('3333',id);
          navigate(`/checkAvailability/${id}`)
    }
  
    return (
      <Container maxW={"5xl"} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Heading>Dr. {doctor.fullName}</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              {doctor.specialization}
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            >
              <Text color={"gray.500"} fontSize={"lg"}>
                Contrary to popular belief, Lorem Ipsum is not simply random text.
                It has roots in a piece of classical Latin literature from 45 BC,
                making it over 2000 years old. Richard McClintock, a Latin
                professor.
              </Text>
              <Button
                /* flex={1} */
                px={4}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
                onClick={()=>checkAvailability(doctor._id)}
              >
                Check availability
              </Button>
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={doctor.profilePic}
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    );
  }