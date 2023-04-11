import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userSignUpSchema } from "../../../schemas";
import { useFormik } from "formik";
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
import toast, { Toaster } from "react-hot-toast";
import axios from "../../../utils/axios";
import { USER_SIGN_UP } from "../../../utils/ConstUrls";

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const body = JSON.stringify(values);
    console.log(body);

    try {
      await axios
        .post(USER_SIGN_UP, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then(({ data }) => {
          if (data.success) {
            navigate("/");
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
    actions.resetForm();
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        password: "",
        date: "",
        number: "",
      },
      validationSchema: userSignUpSchema,
      onSubmit,
    });

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
        <FormControl mt={6}>
          <FormLabel>Username</FormLabel>
          <Input
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            id="userName"
            type="text"
            placeholder="Enter your username"
          />
          {errors.userName && touched.userName && (
            <p className="error">{errors.userName}</p>
          )}
        </FormControl>

        <FormControl mt={6}>
          <FormLabel>Email address</FormLabel>
          <Input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
        </FormControl>

        <FormControl mt={6}>
          <FormLabel>Date of birth</FormLabel>
          <Input
            value={values.date}
            onChange={handleChange}
            onBlur={handleBlur}
            id="date"
            type="date"
            placeholder="Enter your Date of Birth"
          />
          {errors.date && touched.date && (
            <p className="error">{errors.date}</p>
          )}
        </FormControl>

        <FormControl mt={6}>
          <FormLabel>Contact Number</FormLabel>
          <Input
            value={values.number}
            onChange={handleChange}
            onBlur={handleBlur}
            id="number"
            type="number"
            placeholder="Enter your Number"
          />
          {errors.number && touched.number && (
            <p className="error">{errors.number}</p>
          )}
        </FormControl>

        <FormControl mt={6}>
          <FormLabel>Password</FormLabel>
          <Input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}
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
        <Link href="#" onClick={() => navigate("/")} variant="body2" ml={1}>
          Login
        </Link>
      </Text>
      <Toaster />
    </Box>
  );
};

export default Register;
