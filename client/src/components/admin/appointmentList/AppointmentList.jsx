import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Stack,
  Flex,
  Text,
  TableContainer,
} from "@chakra-ui/react";
import axios from "../../../utils/axios";
import { APPOINTMENT } from "../../../utils/ConstUrls";

const AppointmentList = () => {
  const [appointment, setAppointment] = useState([""]);
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    getAppointment();
  }, []);

  const getAppointment = async () => {
    try {
      const response = await axios.get(APPOINTMENT, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      console.log(response.data.appointments);
      setAppointment(response.data.appointments);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(appointment);
  return (
    <Box marginLeft={80} marginTop={10}>
      <Text fontWeight="bold" fontSize="3xl">
        APPOINTMENTS
      </Text>
      <Stack>
        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Doctor Name</Th>
                  <Th>Patient Name</Th>
                  <Th>Booked Date</Th>
                  <Th>Session Date</Th>
                  <Th>Time Slot</Th>
                </Tr>
              </Thead>
              <Tbody>
                {appointment?.map((appointment, index) => (
                  <Tr key={index}>
                    <Td>Dr. {appointment.doctorName}</Td>
                    <Td>{appointment.userName}</Td>
                    <Td>{appointment.bookedDate}</Td>
                    <Td>{appointment.sessionDate}</Td>
                    <Td>{appointment.timeSlot}</Td>
                    <Td></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex
            className="parent-element"
            display="flex"
            justifyContent="flex-end"
            marginRight="150"
          ></Flex>
        </Box>
      </Stack>
    </Box>
  );
};

export default AppointmentList;
