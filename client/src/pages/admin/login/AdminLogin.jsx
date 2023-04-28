import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSchema } from "../../../schemas";
import { useFormik } from "formik";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import { ADMIN_LOGIN } from "../../../utils/ConstUrls";
import { setAdminLogin } from "../../../redux/adminSlice";
import axios from "../../../utils/axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    const body = JSON.stringify(values);
    console.log(body);
    try {
      await axios
        .post(ADMIN_LOGIN, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then(({ data }) => {
          console.log(data.adminToken);
          if (data.success) {
            navigate("/users-list");
            localStorage.setItem("adminToken", data.adminToken);
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
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl>
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
              <FormControl id="password">
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
              <Stack spacing={10}>
                <Button
                  mt={6}
                  bg={"black"}
                  type="submit"
                  color={"white"}
                  _hover={{
                    bg: "black.500",
                  }}
                >
                  LOGIN
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
      <Toaster />
    </Flex>
  );
};

export default AdminLogin;
