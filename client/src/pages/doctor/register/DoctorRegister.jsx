import { React } from "react";
import { useNavigate } from "react-router-dom";
import { doctorSignUpSchema } from "../../../schemas";
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
  Select,
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../../utils/axios";
import { DOC_SIGN_UP } from "../../../utils/ConstUrls";

const DoctorRegister = () => {

  const options = [
    { value: "Cardiologist", label: "Cardiologist" },
    { value: "Dermatologist", label: "Dermatologist" },
    {
      value: "Neurologist",
      label: "Neurologist",
    },
    {
      value: "Oncologist",
      label: "Oncologist",
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


  const onSubmit = async (values, actions) => {
    const body = JSON.stringify(values);
    console.log(body)
  
    try {
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
    } catch (err) {
      toast.error("Oops Something went wrong");
    }
    actions.resetForm(); 
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      date: "",
      number: "",
      specialization: "",
      experience: "",
      register: ""
    },
    validationSchema: doctorSignUpSchema,
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
      marginTop="5"
    >
      <Box textAlign="center" mb={4}>
        <Heading>Doctor Register</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Full name</FormLabel>
          <Input
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            id="fullName"
            type="text"
            placeholder="Enter your fullName"
          />
          {errors.fullName && touched.fullName && (
            <p className="error">{errors.fullName}</p>
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
          <FormLabel>Medical Register Number</FormLabel>
          <Input
            placeholder="Enter your Register Number"
            size="md"
            value={values.register}
            onChange={handleChange}
            onBlur={handleBlur}
            id="register"
            type="number"
          />
          {errors.register && touched.register && (
            <p className="error">{errors.register}</p>
          )}
        </FormControl>

        <FormControl mt={6}>
          <FormLabel>Qualification</FormLabel>
          <Select
            placeholder="Choose your Qualification"
            value={values.specialization}
            onChange={handleChange}
            onBlur={handleBlur}
            id="specialization"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {errors.specialization && touched.specialization && (
            <p className="error">{errors.specialization}</p>
          )}
        </FormControl>

        <FormControl mt={6}>
          <FormLabel>Experience</FormLabel>
          <Select
            placeholder="Choose your Experience in years"
            value={values.experience}
            onChange={handleChange}
            onBlur={handleBlur}
            id="experience"
          >
            {exp.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {errors.experience && touched.experience && (
            <p className="error">{errors.experience}</p>
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
          bg="#011c91"
          colorScheme="#011c91"
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
