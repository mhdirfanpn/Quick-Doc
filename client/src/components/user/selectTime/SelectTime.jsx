import {
  Box,
  Heading,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Flex,
  Center,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import moment from "moment";
import { DatePicker } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_DOCTOR } from "../../../utils/ConstUrls";
import axios from "../../../utils/axios";

const SelectTime = () => {
  const [doctor, setDoctor] = useState("");
  const [timeSlot, SetTimeSlot] = useState([""]);

  const params = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  const getDoctorsDetails = async () => {
    try {
      axios
        .get(`${GET_DOCTOR}/${params.doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setDoctor(response.data.doctor);
          SetTimeSlot(response.data.doctor.timeSlot);
        })
        .catch((err) => {
          console.log(err, "catch error in doctorFetching");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
    setSelectedTime(null);
  };

  const handleTimeChange = async (time) => {
    try {
      if (selectedDate === null) return toast.error("select a date");
      await axios
        .post("/availability", {
          doctorId: params.doctorId,
          time: time,
          date: selectedDate,
        })
        .then((response) => {
          if (response.status === 202) {
            setSelectedTime(time);
            toast.success("time slot available");
          }
          if (response.status === 204) {
            setSelectedTime(null);
            toast.error("time slot unavailable");
          }
          console.log(response);
        })
        .catch((err) => {
          console.log(err, "catch error in doctorFetching");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/handlePay", { state: { doctor, selectedDate, selectedTime } });
  };

  console.log(selectedDate);

  return (
    <Center>
      <Container maxW={"5xl"} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Heading color={"#051766"}>Dr. {doctor.fullName}</Heading>
            <Text color={"#526ccc"} fontSize={"lg"}>
              {doctor.specialization}
            </Text>
            <Text color={"#575963"} mb={4} fontSize={"md"}>
              Treatment amount:500
            </Text>
            <Stack>
              <Box w="full" h={60} mb={5}>
                <FormControl as="form" onSubmit={handleSubmit}>
                  <FormLabel>Date</FormLabel>
                  <DatePicker
                    onChange={handleDateChange}
                    disabledDate={(currentDate) => {
                      // disable dates before today
                      if (
                        currentDate &&
                        currentDate < moment().startOf("day")
                      ) {
                        return true;
                      }
                      // disable dates more than 30 days in the future
                      if (
                        currentDate &&
                        currentDate > moment().add(30, "days")
                      ) {
                        return true;
                      }
                      return false;
                    }}
                  />

                  <FormLabel mt={4}>Time</FormLabel>
                  <SimpleGrid columns={3} spacing={4}>
                    {timeSlot.map((timeSlot) => (
                      <Button
                        key={timeSlot.time}
                        variant={timeSlot.available ? "outline" : "ghost"}
                        onClick={() => handleTimeChange(timeSlot.time)}
                        disabled={!timeSlot.available}
                      >
                        {timeSlot.time}
                      </Button>
                    ))}

                    <Button
                      key={timeSlot.time}
                      variant={timeSlot.available ? "outline" : "ghost"}
                      onClick={() => handleTimeChange(timeSlot.time)}
                      disabled={!timeSlot.available}
                    >
                      {timeSlot.time}
                    </Button>
                  </SimpleGrid>
                  {selectedTime && selectedDate && (
                    <Button
                      mt={4}
                      type="submit"
                      disabled={!selectedTime || !selectedDate}
                    >
                      Book Appointment
                    </Button>
                  )}
                </FormControl>
              </Box>
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={doctor.profilePic}
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
      </Container>
      <Toaster />
    </Center>
  );
};

export default SelectTime;
