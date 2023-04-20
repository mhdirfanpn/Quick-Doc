import { React, useState, useEffect } from "react";
import { Box, Button, Grid, GridItem, FormControl, Text, FormLabel, Input, Avatar, useDisclosure, Heading, Stack,Center,Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { doctorDetailsUpdateSchema, changePasswordSchema } from "../../../schemas";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DOC_DETAILS, UPDATE_DOC_DETAILS,UPDATE_DOC_PASS } from "../../../utils/ConstUrls";
import axios from "../../../utils/axios";
import jwtDecode from "jwt-decode";
import { useFormik } from "formik";
import { UPDATE_DOC_IMG } from "../../../utils/ConstUrls";
import { TimePicker } from "antd";
import  moment from "moment"
import { useDispatch, } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/spinnerSlice";

const DoctorProfileEdit = () => {

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure(); // state variables for showing/hiding the 
  const [doctorDetails, setDoctorDetails] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [state, setState] = useState("");
  const token = localStorage.getItem("doctorToken");
  const decode = jwtDecode(token);
  const dispatch = useDispatch()


  const getUDoctorDetails = async () => {
    try {
      await axios.get(`${DOC_DETAILS}/${decode.id}`, {headers: { Authorization: `Bearer ${token}` }, }).then((response) => {
          console.log(response.data.doctorDetails);
          setDoctorDetails(response.data.doctorDetails);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(doctorDetails.timings);
  const { values,setFieldValue, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        fullName: doctorDetails.fullName,
        email: doctorDetails.email,
        experience: doctorDetails.experience,
        number: doctorDetails.number,
        timings: doctorDetails.timings && doctorDetails.timings.length >= 2 ? [moment(doctorDetails.timings[0], 'HH:mm'), moment(doctorDetails.timings[1], 'HH:mm')] : ['','']
      },
      enableReinitialize: true,
      validationSchema: doctorDetailsUpdateSchema,
      onSubmit: async (values,setFieldValue, actions) => {
        try {
          console.log(values.timings[0]);
          const formattedValues = {
            ...values,
            timings: [
              moment(values.timings[0], 'HH:mm'),
              moment(values.timings[1], 'HH:mm'),
            ]
          };
     
          const time =moment(values.timings[0], 'HH:mm');

console.log('2222',time,'555');
          console.log(formattedValues);
         let sample= moment(values.timings[0]).format("hh:mm")
         console.log(sample);
          await axios.put(`${UPDATE_DOC_DETAILS}/${decode.id}`,values, {headers: { Authorization: `Bearer ${token}` },}).then((response) => {
              console.log(response.data);
              if (response.data) {
                setState(response.data);
                toast.success("updated successfully")
              } else {
                 toast.error("Oops Something went wrong");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
          toast.error("Oops Something went wrong");
        }
        actions.resetForm();
      },
    });

    const {values: form2Values,errors: form2Errors,touched: form2Touched,handleChange: form2HandleChange,handleBlur: form2HandleBlur,handleSubmit: form2HandleSubmit,
    } = useFormik({
      initialValues: {
        newPassword: "",
        confirmPassword: "",
      },
       validationSchema: changePasswordSchema,
      onSubmit: async (values, actions) => {
        console.log(values);
        try {
          await axios.put(`${UPDATE_DOC_PASS}/${decode.id}`, values, { headers: { Authorization: `Bearer ${token}` },}).then((response) => {
              console.log(response.data);
              if (response.data) {
                setState(response.data)
                toast.success("Password updated successfully")
              } else {
                toast.error("Oops Something went wrong");
              }
            })
            .catch((err) => {
              toast.error("Oops Something went wrong");
            });
        } catch (err) {
           toast.error("Oops Something went wrong");
        }
        actions.resetForm();
      },
    });

    const handleChangeImg = (e) => {
      setProfilePicture(e.target.files[0]);
    }
  
    const handleImageSumbit = async (e) => {
      e.preventDefault();
      if (profilePicture === undefined) {
        return toast.error("Please select an image")
      }
      console.log(profilePicture);
      const formData = new FormData();
      formData.append('image', profilePicture);
      console.log(profilePicture);
      console.log(formData);
         dispatch(showLoading())
      await axios.put(`${UPDATE_DOC_IMG}/${decode.id}`,formData,{ headers: { Authorization: `Bearer ${token}` },}).then((res)=>{
        if(res){
          setState(res);
          onClose();
            dispatch(hideLoading())
          toast.success("image updated successfully")
        }
      }).catch((err)=>{
        onClose();
          dispatch(hideLoading())
        toast.error("Oops Something went wrong");
        
      })
    };

  useEffect(() => {
    getUDoctorDetails();
  }, [state]);

  let imageUrl = doctorDetails.profilePic

  return (
    <Box
      marginLeft="330"
      marginTop={10}
      bg="white"
      rounded="lg"
      border="1px"
      borderColor="gray.200"
      maxWidth="1400"
      p={4}
      shadow="md"
      dark={{ bg: "gray.800", borderColor: "gray.700" }}
    >
      
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
        </Heading>
    
          <FormControl id="userName">
            
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
      <Avatar
        src={imageUrl}
        alt="Doctor's Profile Photo"
        size="2xl"
        marginBottom={5}
      />
         </Center>
         <EditIcon
            onClick={onOpen}
            position="absolute"
            top="110"
            left="100px"
          />

                <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                  motionPreset="scale"
                  isCentered={false}
                  top="auto"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Upload Profile Image</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleImageSumbit}>
                    <ModalBody>
                      <FormControl id="profileImage">
                        <FormLabel>Choose an image to upload</FormLabel>
                        <input accept="image/*" type="file" name="file" onChange={handleChangeImg} />                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onClose} mr={3}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="blue"
                        type="submit"
                      >
                        Upload
                      </Button>
                     
                    </ModalFooter>
                    </form>
                  </ModalContent>
                </Modal>
          
            </Stack>
          </FormControl>

      <Grid gap={8} templateColumns={{ lg: "repeat(2, 1fr)" }}>
        <form>
          <Grid gap={8} templateColumns={{ lg: "repeat(2, 1fr)" }}>
            <GridItem>
              <FormControl id="fullName" isRequired mt={6}>
                <FormLabel>Name</FormLabel>
                <Input
                  name="fullName"
                  id="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  style={{ color: "grey" }}
                />
                 {errors.fullName && touched.fullName && (
            <p className="error">{errors.fullName}</p>
          )}
              </FormControl>
              <FormControl id="email" isRequired mt={6}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  style={{ color: "grey" }}
                />
                {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
              </FormControl>

              <FormControl id="email" isRequired mt={6}>
                <FormLabel>Timings</FormLabel>
              
                <TimePicker.RangePicker
                id="timings"
                name="timings"
                format="hh:mm A"
                value={values.timings}
                onChange={(value) => {
                  setFieldValue('timings', value);
                }}
                onBlur={handleBlur}
              />
           
              </FormControl>

            </GridItem>
            <GridItem>
              <FormControl id="experience" isRequired mt={6}>
                <FormLabel>Experience</FormLabel>
                <Input
                  placeholder="Enter years of experience"
                  name="experience"
                  id="experience"
                  value={values.experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  style={{ color: "grey" }}
                />
                 {errors.experience && touched.experience && (
            <p className="error">{errors.experience}</p>
          )}
              </FormControl>
              <FormControl id="number" isRequired mt={6}>
                <FormLabel>Mobile</FormLabel>
                <Input
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="number"
                  name="number"
                  type="number"
                  placeholder="Enter your number"
                  style={{ color: "grey" }}
                />
                 {errors.number && touched.number && (
            <p className="error">{errors.number}</p>
          )}
              </FormControl>
            </GridItem>
          </Grid>
          <Button
            type="submit"
            colorScheme="blue"
            mt={6}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Text
            mt={6}
            color="red.500"
            onClick={() => setShowPasswordForm(!Boolean(showPasswordForm))}
          >
            Change password
          </Text>
        </form>
        {showPasswordForm && (
          <form  onSubmit={form2HandleSubmit}>
            <GridItem ml={10}>
              <FormControl id="fullName" isRequired mt={6}>
                <FormLabel>New Password</FormLabel>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  value={form2Values.newPassword}
                onChange={form2HandleChange}
                onBlur={form2HandleBlur}
                  _placeholder={{ color: "gray.500" }}
                  style={{ color: "grey" }}
                />
                {form2Errors.newPassword && form2Touched.newPassword && (
                <p className="error">{form2Errors.newPassword}</p>
              )}
              </FormControl>
              <FormControl id="email" isRequired mt={6}>
                <FormLabel>Confirm Password</FormLabel >
                <Input
                  value={form2Values.confirmPassword}
                  onChange={form2HandleChange}
                  onBlur={form2HandleBlur}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Enter your confirm password"
                  _placeholder={{ color: "gray.500" }}
                  style={{ color: "grey" }}
                />
                {form2Errors.confirmPassword && form2Touched.confirmPassword && (
                <p className="error">{form2Errors.confirmPassword}</p>
              )}
              </FormControl>
            </GridItem>

            <Button type="submit" colorScheme="blue" ml={10} mt={6}>
              Save Password
            </Button>
          </form>
        )}
      </Grid>
      <Toaster />
    </Box>
  );
};

export default DoctorProfileEdit;
