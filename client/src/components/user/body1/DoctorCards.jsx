import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Flex, IconButton, Card, Container, CardBody, Heading, Stack, Box, Text, Button, Image, Divider, CardFooter, ButtonGroup } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { GET_DOCTORS } from '../../../utils/ConstUrls';
import jwtDecode from 'jwt-decode';
import axios from "../../../utils/axios";
import { useNavigate } from 'react-router-dom';



const DoctorCards = () => {


    const [scrollLeft, setScrollLeft] = useState(0);
    const containerRef = useRef(null);
    const cardWidth = 350; // Adjust this value to change the card width
    const [doctorDetails,setDoctorDetails]=useState(['']);
    const navigate = useNavigate()
  
    const handleScrollLeft = () => {
      const container = containerRef.current;
      if (container) {
        container.scrollBy({
          left: -container.offsetWidth,
          behavior: "smooth",
        });
        setScrollLeft(container.scrollLeft - container.offsetWidth);
      }
    };
  
    const handleScrollRight = () => {
      const container = containerRef.current;
      if (container) {
        container.scrollBy({
          left: container.offsetWidth,
          behavior: "smooth",
        });
        setScrollLeft(container.scrollLeft + container.offsetWidth);
      }
    };


    const viewMore = (id) => {
      console.log(id);
      navigate(`/doctorDetails/${id}`);
    };


    useEffect(()=>{
      getAllDoctors();
    },[])
  
   
    const token = localStorage.getItem("userToken");
    const decode = jwtDecode(token);
    
  
  
    const getAllDoctors = async()=>{
      try{
       
          await axios.get(`${GET_DOCTORS}`,{ headers: { 'Authorization': `Bearer ${token}` } }).then((response)=>{
            if(response.data.doctors){
              setDoctorDetails(response.data.doctors)
            }
        }).catch((err)=>{
          console.log(err);
        })
          
        
      }catch(err){
        console.log(err)
      }   
    }

    console.log(doctorDetails);



  return (
    <Container maxW={'8xl'} py={12} mt={6}>
        
    <Box w="100%" overflowX="hidden">
    <Heading as="h2" textAlign="center" my={8} size="2xl">
        Our Doctors
      </Heading>
      <Flex ref={containerRef} overflowX="scroll" w="100%" h="auto">
      {doctorDetails?.map((doctor) => (
        <Box minW={`${cardWidth}px`}>
        <Card maxW='sm'>
  <CardBody>
    <Image
      ml={6}
      src={doctor.profilePic}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      onClick={() => viewMore(doctor._id)}
    />
    <Stack mt='6' spacing='3' ml='6'>
      <Heading size='md' >{doctor.fullName}</Heading>
      <Text >
        {doctor.specialization}
      </Text>
     
    </Stack>
  </CardBody>
  {/* <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter> */}
</Card>
        </Box>
       ))}

        
  

      
        {/* Add more cards as needed */}
      </Flex>






    {/* Add more cards as needed */}

    <IconButton
        aria-label="Scroll left"
        icon={<ChevronLeftIcon />}
        size="md"
        variant="ghost"
        colorScheme="blue"
        position="absolute"
        left="9%"
        top="70%"
        backgroundColor="#cfceca"
        transform="translateY(-50%)"
        onClick={handleScrollLeft}
        disabled={scrollLeft === 0}
      />
      
      <IconButton
        aria-label="Scroll right"
        icon={<ChevronRightIcon />}
        size="md"
        variant="ghost"
        colorScheme="blue"
        position="absolute"
        right="9%"
        top="70%"
        backgroundColor="#cfceca"
        transform="translateY(-50%)"
        onClick={handleScrollRight}
        disabled={scrollLeft === containerRef.current?.scrollWidth - containerRef.current?.offsetWidth}
      />
    </Box>
</Container>
  );
}


export default DoctorCards


