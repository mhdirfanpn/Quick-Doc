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
import moment from 'moment';
import { DatePicker } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";

const SelectTime = () => {
  const [timeSlot, SetTimeSlot] = useState([]);
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  let doctor = location.state.doctor;
  const token = localStorage.getItem("userToken");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = async(date) => {
    const isoDateString = date.toISOString().split("T")[0];
    const value1 = params.doctorId;
    const value2 = isoDateString;
    try {
     const response = await axios
        .get(`/getTime`, {
          params: {
            value1,
            value2,
          },
        })
        if(response){
          SetTimeSlot(response.data);
        }
    } catch (err) {
      console.log(err);
    }

    setSelectedDate(date.toISOString().split("T")[0]);
    setSelectedTime(null);
  };

  const handleTimeChange = async (time) => {
    try {
      if (selectedDate === null) return toast.error("select a date");
      const response = await axios.post("/availability", {
        doctorId: params.doctorId,
        time: time,
        date: selectedDate,
      });

      if (response.status === 202) {
        setSelectedTime(time);
        toast.success("time slot available");
      }
      if (response.status === 204) {
        setSelectedTime(null);
        toast.error("time slot unavailable");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/handlePay", { state: { doctor, selectedDate, selectedTime } });
  };

  useEffect(() => {}, [timeSlot]);

  return (
    <Center>
      <Container maxW={"5xl"} py={12} mt={24}>
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
                    {timeSlot.length ? (
                      <>
                        {timeSlot.map((timing, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => handleTimeChange(timing)}
                          >
                            {timing}
                          </Button>
                        ))}
                      </>
                    ) : (
                      <Button
                        variant="ghost"
                        fontSize="sm"
                        color={"red.400"}
                        fontWeight={"light"}
                        _hover={{ color: "transparent" }}
                      >
                        Not available in this date
                      </Button>
                    )}
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
