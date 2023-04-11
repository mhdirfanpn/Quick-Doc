import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, } from "react-redux";
import { loginSchema } from "../../../schemas";
import { useFormik } from "formik";
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
import { USER_LOGIN } from "../../../utils/ConstUrls";
import { setLogin } from "../../../redux/userSlice";

const Login = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    const body = JSON.stringify(values);
    console.log(body);
    try {
      await axios
        .post(USER_LOGIN, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then(({ data }) => {
          console.log(data.userDetails);
          if (data.success) {

            dispatch(
              setLogin({
                user: data.userDetails,
                token: data.token,
              })
            );
            navigate('/home'); 
            localStorage.setItem('userToken',data.token);
          
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

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
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
      marginTop="40"
    >
      <Box textAlign="center" mb={4}>
        <Heading>Login</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
             value={values.email}
             onChange={handleChange}
             onBlur={handleBlur}
             id="email" type="email" placeholder="Enter your email" />
             {errors.email && touched.email && <p className="error">{errors.email}</p>}
        </FormControl>

        <FormControl mt={6}>
          <FormLabel>Password</FormLabel>
          <Input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id="password" type="password" placeholder="Enter your password" />
             {errors.password && touched.password && <p className="error">{errors.password}</p>}
      
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
        Doesn't have an account? <Link to="/SignUp">Sign in</Link>
      </Text>
      <Toaster />
    </Box>
  );
};

export default Login;
