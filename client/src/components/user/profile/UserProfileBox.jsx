import {
  userDetailsUpdateSchema,
  changePasswordSchema,
} from "../../../schemas";
import { useFormik } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";

import { React, useState, useEffect } from "react";

import jwtDecode from "jwt-decode";
import axios from "../../../utils/axios";
import { USER_DETAILS } from "../../../utils/ConstUrls";

const Login = () => {
  const [UserDetails, setUserDetails] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const token = localStorage.getItem("userToken");
  const decode = jwtDecode(token);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      await axios
        .get(`${USER_DETAILS}/${decode.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserDetails(response.data.userDetails);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (values, actions) => {
    const body = JSON.stringify(values);
    console.log(body);
    actions.resetForm();
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        userName: UserDetails.userName,
        email: UserDetails.email,
        number: UserDetails.number,
      },
      enableReinitialize: true,
      validationSchema: userDetailsUpdateSchema,
      onSubmit,
    });

  const {
    values: form2Values,
    errors: form2Errors,
    touched: form2Touched,
    handleChange: form2HandleChange,
    handleBlur: form2HandleBlur,
    handleSubmit: form2HandleSubmit,
  } = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values, actions) => {
      const body = JSON.stringify(values);
      console.log(body);
      actions.resetForm();
    },
  });

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      maxWidth={{ base: "20%", md: "25%" }}
      margin="0 auto"
      marginTop="14"
      marginBottom="20"
    >
      <Flex justifyContent="center">
        <Box
          borderWidth="40px"
          borderStyle="solid"
          borderColor="slate.300"
          borderRadius="lg"
          mt={10}
          gridTemplateColumns={{ md: "1fr 1fr" }}
          gridGap={4}
        >
          <Flex justifyContent="center">
            <Image
              src="https://icons-for-free.com/iconfiles/png/512/avatar+human+people+profile+user+icon-1320168139431219590.png"
              alt=""
              w="fit"
              h={32}
              mt={7}
              mb={7}
            />
          </Flex>
          <Box>
            <Box as="p" pl={6} fontSize="4xl" fontWeight="bold" color="black">
              {UserDetails.userName}
            </Box>
          </Box>
        </Box>
      </Flex>
      <Box mt={10}>
        <form onSubmit={handleSubmit}>
          <FormControl mt={6}>
            <FormLabel>User Name</FormLabel>
            <Input
              name="userName"
              id="userName"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your name"
              style={{ color: "#94a0b3" }}
            />
            {errors.userName && touched.userName && (
              <p className="error">{errors.userName}</p>
            )}
          </FormControl>

          <FormControl mt={6}>
            <FormLabel>Email address</FormLabel>
            <Input
              bg="white"
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              style={{ color: "#94a0b3" }}
            />
            {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}
          </FormControl>

          <FormControl mt={6}>
            <FormLabel>Contact</FormLabel>
            <Input
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
              id="number"
              name="number"
              type="number"
              placeholder="Enter your number"
              style={{ color: "#94a0b3" }}
            />
            {errors.number && touched.number && (
              <p className="error">{errors.number}</p>
            )}
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
            SAVE CHANGES
          </Button>
        </form>
        <Flex justifyContent="center" mt={4}>
          <Button
            variant="link"
            fontSize="sm"
            fontWeight="medium"
            color="purple.500"
            _hover={{ textDecoration: "underline" }}
            onClick={() => setShowPasswordForm(!Boolean(showPasswordForm))}
          >
            Change Password
          </Button>
        </Flex>
        {showPasswordForm && (
          <form onSubmit={form2HandleSubmit}>
            <FormControl mt={5}>
              <FormLabel>New Password</FormLabel>
              <Input
                value={form2Values.newPassword}
                onChange={form2HandleChange}
                onBlur={form2HandleBlur}
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter your new password"
                bg="white"
                border="1px"
                borderColor="purple.400"
                borderRadius="md"
                focusBorderColor="purple.400"
                focusRingColor="purple.300"
                _focus={{ boxShadow: "none" }}
              />
              {form2Errors.newPassword && form2Touched.newPassword && (
                <p className="error">{form2Errors.newPassword}</p>
              )}
            </FormControl>

            <FormControl mt={5}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                value={form2Values.confirmPassword}
                onChange={form2HandleChange}
                onBlur={form2HandleBlur}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter your confirm password"
                bg="white"
                border="1px"
                borderColor="purple.400"
                borderRadius="md"
                focusBorderColor="purple.400"
                focusRingColor="purple.300"
                _focus={{ boxShadow: "none" }}
              />
              {form2Errors.confirmPassword && form2Touched.confirmPassword && (
                <p className="error">{form2Errors.confirmPassword}</p>
              )}
            </FormControl>

            <Flex justifyContent="center" mt={4}>
              <Button
                type="submit"
                w="48"
                px="4"
                py="2"
                fontSize="md"
                fontWeight="medium"
                textTransform="uppercase"
                colorScheme="green"
                bg="#46c29d"
              >
                Save Password
              </Button>
            </Flex>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default Login;
