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
import { DOC_APPOINTMENT } from "../../../utils/ConstUrls";
import jwtDecode from "jwt-decode";

const AppointmentList = () => {
  const token = localStorage.getItem("doctorToken");
  const DoctorData = jwtDecode(token);
  console.log(DoctorData.id);
  const [session, setSession] = useState([]);

  useEffect(() => {
    getSessionDetails();
  }, []);

  const getSessionDetails = async () => {
    try {
      const response = await axios.get(`${DOC_APPOINTMENT}/${DoctorData.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSession(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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
                  <Th>Patient Name</Th>
                  <Th>Booked Date</Th>
                  <Th>Appointment Date</Th>
                  <Th>Time Slot</Th>
                </Tr>
              </Thead>
              <Tbody>
                {session?.map((appointment, index) => (
                  <Tr key={index}>
                    <Td>{appointment.userName}</Td>
                    <Td>{appointment.bookedDate}</Td>
                    <Td>{appointment.sessionDate}</Td>
                    <Td>{appointment.timeSlot}</Td>
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