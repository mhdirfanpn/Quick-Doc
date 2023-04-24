import { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Checkbox,
  Badge,
  Button,
  Flex,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import axios from "../../../utils/axios";
import toast, { Toaster } from "react-hot-toast";

const availableTimings = [
  { time: "10:00 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "6:00 PM", available: true },
  { time: "8:00 PM", available: true },
];

function TimeSlot() {
  const doctorToken = localStorage.getItem("doctorToken");
  const [selectedTimings, setSelectedTimings] = useState([]);

  const handleTimingSelection = (timing) => {
    const index = selectedTimings.indexOf(timing);
    if (index === -1) {
      setSelectedTimings([...selectedTimings, timing]);
    } else {
      setSelectedTimings(selectedTimings.filter((t) => t !== timing));
    }
  };

  const handleSubmit = async (e) => {
    console.log("Selected timings:", selectedTimings);
    e.preventDefault();
    try {
      const decode = jwtDecode(localStorage.getItem("doctorToken"));
      await axios
        .post("doc/timeSlot", [selectedTimings, { id: decode.id }], {
          headers: { Authorization: `Bearer ${doctorToken}` },
        })
        .then((response) => {})
        toast.success("time slot updated successfully")
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      p="6"
      bg="white"
      marginLeft="330"
      marginTop={10}
      maxWidth="1400"
      border="1px"
      borderColor="gray.200"
      rounded="lg"
      shadow="md"
      _hover={{ bg: "gray.100" }}
      dark={{
        bg: "gray.800",
        border: "1px",
        borderColor: "gray.700",
        _hover: { bg: "gray.700" },
      }}
    >
      <VStack align="stretch" spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Select Appointment Timings:
        </Text>
        <Flex wrap="wrap">
          {availableTimings.map((timing) => (
            <Checkbox
              paddingLeft={28}
              key={timing.time}
              isDisabled={!timing.available}
              isChecked={selectedTimings.includes(timing)}
              onChange={() => handleTimingSelection(timing)}
            >
              {timing.time}
              {!timing.available && (
                <Badge ml={2} colorScheme="red">
                  Booked
                </Badge>
              )}
            </Checkbox>
          ))}
        </Flex>
        <Flex justify="center">
          <Button
            mt={6}
            colorScheme="blue"
            size="sm"
            disabled={selectedTimings.length === 0}
            onClick={handleSubmit}
          >
            Submit Timings
          </Button>
        </Flex>
        <Flex mt={4}>
          {selectedTimings.length > 0 ? (
            selectedTimings.map((timing) => (
              <Box key={timing.time} mr={12}>
                <Badge colorScheme="green">{timing.time}</Badge>
              </Box>
            ))
          ) : (
            <Text fontStyle="italic">
              Please select one or more available appointment timings.
            </Text>
          )}
        </Flex>
      </VStack>
      <Toaster/>
    </Box>
  );
}

export default TimeSlot;
