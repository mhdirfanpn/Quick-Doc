import React from 'react'
import {
    Box,
    Button,
    Grid,
    GridItem,
    IconButton,
    Text,
    FormControl,
    FormLabel,
    Input,
    Image
  } from "@chakra-ui/react";
  
  import { MdEdit } from "react-icons/md";
  import { useNavigate } from 'react-router-dom';
  

const DoctorProfileEdit = () => {
    const navigate=useNavigate()

    const handleSubmit=()=>{
        navigate('/doctor-home')
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
  <Image
    src='https://www.asterhospitals.in/sites/default/files/styles/webp/public/2022-02/dr-anil-kumar-r-best-cardiologist-in-kochi.jpg.webp?itok=CntgMaxn/'
    alt="Doctor's Profile Photo"
    boxSize="150px"
    objectFit="cover"
    rounded="full"
    marginBottom={5}
  />

  <Grid gap={8} templateColumns={{ lg: "repeat(2, 1fr)" }}>
  <form >
    <Grid gap={8} templateColumns={{ lg: "repeat(2, 1fr)" }}>
      <GridItem>
        <FormControl id="fullName" isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" placeholder="Enter full name" />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter email address" />
        </FormControl>
       
      </GridItem>
      <GridItem>
        <FormControl id="experience" isRequired>
          <FormLabel>Experience</FormLabel>
          <Input type="text" placeholder="Enter years of experience" />
        </FormControl>
        <FormControl id="number" isRequired>
          <FormLabel>Mobile</FormLabel>
          <Input type="text" placeholder="Enter mobile number" />
        </FormControl>
        
      </GridItem>
    </Grid>
    <Button type="submit" colorScheme="blue" mt={6} onClick={handleSubmit}>
      Submit
    </Button>
  </form>
  </Grid>
</Box>

  )
}

export default DoctorProfileEdit