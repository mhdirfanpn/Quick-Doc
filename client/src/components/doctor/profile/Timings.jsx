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

const Timings = () => {


    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure(); // state variables for showing/hiding the 
    const [doctorDetails, setDoctorDetails] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [state, setState] = useState("");
    const token = localStorage.getItem("doctorToken");
    const decode = jwtDecode(token);
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
      <Grid gap={8} templateColumns={{ lg: "repeat(2, 1fr)" }}>
        <form>
          <Grid gap={8} templateColumns={{ lg: "repeat(2, 1fr)" }}>
            <GridItem>
              <FormControl id="email" isRequired mt={6}>
                <FormLabel>Timings</FormLabel>

                <TimePicker.RangePicker
                //   id="timings"
                //   name="timings"
                //   format="hh:mm A"
                //   value={values.timings}
                //   onChange={(value) => {
                //     setFieldValue("timings", value);
                //   }}
                //   onBlur={handleBlur}
                />
              </FormControl>
            </GridItem>
          </Grid>
          <Button
            type="submit"
            colorScheme="blue"
            mt={6}
          //  onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Grid>
      <Toaster />
    </Box>
  );
};

export default Timings;
