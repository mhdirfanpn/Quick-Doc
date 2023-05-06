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
import { DatePicker } from "antd";

const availableTimings = [
  { time: "10:00 AM" },
  { time: "12:00 PM" },
  { time: "2:00 PM" },
  { time: "4:00 PM" },
  { time: "6:00 PM" },
  { time: "8:00 PM" },
];

function TimeSlot() {
  const doctorToken = localStorage.getItem("doctorToken");
  const [selectedTimings, setSelectedTimings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleTimingSelection = (timing) => {
    const index = selectedTimings.indexOf(timing);
    if (index === -1) {
      setSelectedTimings([...selectedTimings, timing]);
    } else {
      setSelectedTimings(selectedTimings.filter((t) => t !== timing));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDate === null) return toast.error("select a date");
    try {
      const decode = jwtDecode(localStorage.getItem("doctorToken"));
      let id = decode.id;
      
      const body = ({
        selectedDate,
        selectedTimings,
        id,
      });

      await axios
        .post("doc/timeSlot", body, {
          headers: { Authorization: `Bearer ${doctorToken}` },
        })
        .then(() => {
          toast.success("time slot updated successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDateChange = (date) => {
    console.log(date.toISOString().split("T")[0]);
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  return (
    <Box
      p="6"
      bg="white"
      marginLeft={24}
      marginTop={24}
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
      {" "}
      <Text fontSize="xl" fontWeight="medium">
        Select Date:
      </Text>
      <Box mt={3}>
        <DatePicker onChange={handleDateChange} />
      </Box>
      <VStack align="stretch" spacing={4} mt={9}>
        <Text fontSize="xl" fontWeight="medium">
          Select Time:
        </Text>
        <Flex wrap="wrap">
          {availableTimings.map((timing) => (
            <Checkbox
              paddingLeft={28}
              key={timing.time}
              // isDisabled={!timing.available}
              isChecked={selectedTimings.includes(timing)}
              onChange={() => handleTimingSelection(timing)}
            >
              {timing.time}
              {/* {!timing.available && (
                <Badge ml={2} colorScheme="red">
                  Booked
                </Badge>
              )} */}
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
      <Toaster />
    </Box>
  );
}

export default TimeSlot;
