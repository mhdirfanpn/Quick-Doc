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
import toast, { Toaster } from 'react-hot-toast';
import axios from "../../../utils/axios"
import { USER_SIGN_UP } from "../../../utils/ConstUrls";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userName ==="" || date ==="" || number ==="" || email === "" || password === "") {
      return toast.error("Please Fill the Components");
    }

    const body= JSON.stringify({
      userName,
      date,
      number,
      email,
      password
    })
   

    await axios.post(USER_SIGN_UP,body,{ headers: { "Content-Type": "application/json" } }).then(({data})=>{
      if(data.success){        
        navigate('/login');
      }else{
        toast.error(data.message)
      }
    })


  };
 
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      maxWidth={{ base: "20%", md: "25%" }}
      margin="0 auto"
      marginTop="20"
    >
      <Box textAlign="center" mb={4}>
        <Heading>Register</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Full name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your full name"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
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
          size="md"
          mt={6}
          width="100%"
          alignContent="center"
          type="submit"
          color="white"
        >
          SIGN IN
        </Button>
      </form>
      <Text align="center" mt={3}>
        Already have an account?{" "}
        <Link
          href="#"
          onClick={() => navigate("/login")}
          variant="body2"
          ml={1}
        >
          Login
        </Link>
      </Text>
      <Toaster />
    </Box>
  );
};

export default Register;
