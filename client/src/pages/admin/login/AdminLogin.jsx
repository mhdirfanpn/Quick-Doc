import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import { ADMIN_LOGIN } from "../../../utils/ConstUrls";
import axios from "../../../utils/axios";

const AdminLogin = () => {
  const navigate = useNavigate();
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
        .post(ADMIN_LOGIN, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then(({ data }) => {
          console.log(data);
          if (data.success) {
            document.cookie = `token:${data.token}`;
            console.log(data.adminDetails);
            navigate("/admin-home");
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
      <Box textAlign="center" mb={6}>
        <Heading>ADMIN LOGIN</Heading>
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
          colorScheme="#0A1F29"
          bg="#0A1F29"
          size="md"
          mt={7}
          width="100%"
          alignContent="center"
          type="submit"
          color="white"
        >
          LOGIN
        </Button>
      </form>
      <Toaster />
    </Box>
  );
};

export default AdminLogin;
