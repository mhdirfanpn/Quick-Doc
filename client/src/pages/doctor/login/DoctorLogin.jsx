import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { DOC_LOGIN } from "../../../utils/ConstUrls";
import { setDoctorLogin } from "../../../redux/doctorSlice";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onSubmit = async (values, actions) => {
    const body = JSON.stringify(values);
    console.log(body);
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

            navigate("/doctor-home");
            localStorage.setItem("doctorToken", data.token);
            
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
        <Heading>Doctor Login</Heading>
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
          bg="#011c91"
          colorScheme="#011c91"
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
