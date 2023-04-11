import { useNavigate } from "react-router-dom";
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
            dispatch(
              setAdminLogin({
                admin: data.adminDetails,
                token: data.adminToken,
              })
            );
            
             navigate('/users-list'); 
             localStorage.setItem('adminToken',data.adminToken);
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
      <Box textAlign="center" mb={6}>
        <Heading>ADMIN LOGIN</Heading>
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
