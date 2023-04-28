import { React } from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";

import axios from "../../../utils/axios";
import jwtDecode from "jwt-decode";
import { DOC_DETAILS } from "../../../utils/ConstUrls";

const Timings = () => {
  const [doctorDetails, setDoctorDetails] = useState("");
  const token = localStorage.getItem("doctorToken");

  const getDoctorsDetails = async () => {
    try {
      const decode = jwtDecode(localStorage.getItem("doctorToken"));
      await axios
        .get(`${DOC_DETAILS}/${decode.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setDoctorDetails(response.data.doctorDetails);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  let timeSlots = doctorDetails.timeSlot;

  return (
    <Box
      marginLeft={24}
      marginTop={24}
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
        <Grid gap={8} templateColumns={{ lg: "repeat(2, 1fr)" }}>
          <GridItem>
            <FormControl mt={6}>
              <FormLabel fontWeight="bold" fontSize="lg">
                Appointment Timing
              </FormLabel>

              {timeSlots?.map((timeSlot) => (
                <Box
                  key={timeSlot.time}
                  display="inline-block"
                  marginRight="10px"
                >
                  <Text marginX="2">{timeSlot.time}</Text>
                </Box>
              ))}
            </FormControl>
          </GridItem>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Timings;
