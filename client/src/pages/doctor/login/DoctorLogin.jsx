import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../../utils/axios";
import { DOC_LOGIN } from "../../../utils/ConstUrls";
import { setDoctorLogin } from "../../../redux/doctorSlice";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

      if (email === "" || password === "") {
      return toast.error("Please Fill the Components");
    }

    const body = JSON.stringify({
      email,
      password,
    });

    try {
      await axios
        .post(DOC_LOGIN, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then(({ data }) => {
          if (data.success) {
            document.cookie = `token:${data.token}`;

            dispatch(
              setDoctorLogin({
                doctor: data.doctorDetails,
                token: data.token,
              })
            );
            
            console.log(data.doctorDetails,data.token);

            navigate("/doctor-home");
          } else {
            toast.error(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      toast.error("Oops Something went wrong");
    }

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
        <Heading>Doctor Login</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
          colorScheme="green"
          bg="#46c29d"
          size="md"
          mt={6}
          width="100%"
          alignContent="center"
          type="submit"
          color="white"
        >
          LOGIN
        </Button>
      </form>
      <Text align="center" mt={3}>
        Doesn't have an account? <Link to="/doctor-register">Sign in</Link>
      </Text>
      <Toaster />
    </Box>
  );
};

export default DoctorLogin;
