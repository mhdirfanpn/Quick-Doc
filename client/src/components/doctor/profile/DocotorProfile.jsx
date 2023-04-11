import { Box, Image, Badge, Text, VStack, HStack, Flex, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState,useEffect } from "react";
import axios from "../../../utils/axios";
import jwtDecode from "jwt-decode";
import { DOC_DETAILS } from "../../../utils/ConstUrls";

function DoctorProfile() {


  useEffect(()=>{
    getDoctorsDetails();
  },[])

  const [doctorDetails,setDoctorDetails]=useState('');
  const doctorToken=localStorage.getItem('doctorToken');
  


  const getDoctorsDetails = async()=>{
    try{
      const decode = jwtDecode(localStorage.getItem("doctorToken"))
      console.log(decode.id);
        await axios.get(`${DOC_DETAILS}/${decode.id}`,{ headers: { 'Authorization': `Bearer ${doctorToken}` } }).then((response)=>{
        console.log(response.data.doctorDetails);
        setDoctorDetails(response.data.doctorDetails);  
      }).catch((err)=>{
        console.log(err);
      })
        
      
    }catch(err){
      console.log(err)
    }   
  }

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
          {doctorDetails.fullName}
        </Text>

        <Badge colorScheme="teal">{doctorDetails.specialization}</Badge>
      </VStack>


      <HStack mt="4" spacing={3}>
        <Text fontSize="sm" color="gray.600">
        Email:
        </Text>
        <Text fontSize="sm">{doctorDetails.email}</Text>
      </HStack>


      <HStack mt="4" spacing={3}>
        <Text fontSize="sm" color="gray.600">
          Phone:
        </Text>
        <Text fontSize="sm">{doctorDetails.number}</Text>
      </HStack>

      <HStack mt="2" spacing={3}>
        <Text fontSize="sm" color="gray.600">
          DOB:
        </Text>
        <Text fontSize="sm">{doctorDetails.date}</Text>
      </HStack>

      <HStack mt="4" spacing={3}>
        <Text fontSize="sm" color="gray.600">
          Experience:
        </Text>
        <Text fontSize="sm">{doctorDetails.experience}</Text>
      </HStack>
    </Box>
  );
}

export default DoctorProfile;
