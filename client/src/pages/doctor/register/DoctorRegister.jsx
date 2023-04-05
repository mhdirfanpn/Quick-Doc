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
  Select,
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../../utils/axios";
import { DOC_SIGN_UP } from "../../../utils/ConstUrls";

const DoctorRegister = () => {

  const options = [
    { value: "Psychology", label: "Psychology" },
    { value: "Sexology", label: "Sexology" },
    {
      value: " in psychological sciences",
      label: " in psychological sciences",
    },
    {
      value: " Global Mental Health and Wellbeing",
      label: " Global Mental Health and Wellbeing",
    },
  ];

  const exp = [
    {value: "0-1", label: "0-1"},
    {value: "1-2", label: "1-2"},
    {value: "2-3", label: "2-3"},
    {value: "3-4", label: "3-4"},
    {value: "above 4", label: "above 4"},
  ]

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience,setExperience] = useState("")
  const [register, setRegister] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      fullName === "" ||
      date === "" ||
      number === "" ||
      email === "" ||
      password === "" ||
      specialization ==="" ||
      experience ==="" ||
      register ===""
    ) {
      return toast.error("Please Fill the Components");
    }

    const body = JSON.stringify({
      fullName,
      date,
      number,
      email,
      password,
      specialization,
      experience,
      register
    });

    await axios
      .post(DOC_SIGN_UP, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then(({ data }) => {
        if (data.success) {
          navigate("/doctor-login");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      maxWidth={{ base: "20%", md: "25%" }}
      margin="0 auto"
      marginTop="5"
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
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
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
          <FormLabel>Medical Register Number</FormLabel>
          <Input
            placeholder="Enter your Register Number"
            size="md"
            type="text"
            value={register}
            onChange={(event) => setRegister(event.target.value)}
          />
        </FormControl>

        <FormControl mt={6}>
          <FormLabel>Qualification</FormLabel>
          <Select
            placeholder="Choose your Qualification"
            value={specialization}
            onChange={(event) => setSpecialization(event?.target?.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mt={6}>
          <FormLabel>Experience</FormLabel>
          <Select
            placeholder="Choose your Experience in years"
            value={specialization}
            onChange={(event) => setExperience(event?.target?.value)}
          >
            {exp.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
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
          onClick={() => navigate("/doctor-login")}
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

export default DoctorRegister;
