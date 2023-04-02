import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";

const DoctorRegister = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/doctor-login');
      console.log(
        `First Name: ${firstName}, dob: ${date}, Email: ${email}, Contact: ${number}, Password: ${password}`
      );
    
    };
  
    return (
      <Box
        p={4}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        maxWidth={{ base: "20%", md: "25%" }}
        margin="0 auto"
        marginTop="40"
      >
        <Box textAlign="center" mb={4}>
          <Heading>Doctor Register</Heading>
        </Box>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </FormControl>
  
          <FormControl mt={6}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl mt={6}>
            <FormLabel>Date of birth</FormLabel>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </FormControl>
          <FormControl mt={6}>
            <FormLabel>Contact Number</FormLabel>
            <Input
              placeholder="Enter contact number"
              size="md"
              type="text"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
                    </FormControl>
          <FormControl mt={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Button
                     
                     bg="#46c29d"
                     colorScheme="green"
                      size='md'
                      mt={6}
                      width="100%"
                      alignContent='center'
                      type="submit"
                      color="white"
                    >
                      SIGN IN
                    </Button>
        </form>
        <Text align='center' mt={3}>
            Already have an account?  <Link
                  href="#"
                  onClick={() => navigate("/doctor-login")}
                  variant="body2"
                  ml={1}
                >
                  Login
                </Link>
          </Text>
      </Box>
    );
  };

export default DoctorRegister