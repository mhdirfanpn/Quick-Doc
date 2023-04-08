

import React from "react";
import { Box } from "@chakra-ui/react";

const Body1 = () => {
  return (
    <Box display="flex" flexWrap="wrap" p={4}>
      <Box flex={{ base: "1", md: "1", lg: "1" }} textAlign={{ base: "center", md: "left" }} mb={{ base: "8", md: "0" }}>
        <Box marginLeft={{ base: "0", md: "20" }} marginTop={{ base: "60", md: "240" }} textAlign="left">
          <Box fontSize={{ base: "4xl", md: "6xl" }} fontWeight={700}>
            <span style={{ color: "#46c29d" }}>ONLINE HEALTH</span>
            <br />
            DOCTOR CONSULTATION
          </Box>
          <Box fontSize={{ base: "2xl", md: "3xl" }}>
            Our specialist doctors are ready to help you get the care you need, Hassle-free virtual care
          </Box>
        </Box>
      </Box>
      <Box flex={{ base: "1", md: "1", lg: "1" }} textAlign={{ base: "center", md: "right" }} mb={{ base: "8", md: "0" }}>
        <Box marginRight={{ base: "0", md: "10" }} textAlign="right" fontSize={{ base: "6xl", md: "8xl" }}>
          <img src="https://img.freepik.com/free-vector/online-doctor-flat-design_23-2148521415.jpg?w=826&t=st=1680710341~exp=1680710941~hmac=6af90500c51bb4e5d540c55489fbd2e3cd4e462277837ac1f22348ec2088a2a6" alt="imag..." />
        </Box>
      </Box>
    </Box>
  );
};

export default Body1;

