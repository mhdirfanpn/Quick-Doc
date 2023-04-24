import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react';
import jwtDecode from 'jwt-decode';



const UserSession = () => {

  const token = localStorage.getItem("userToken")
  const userData = jwtDecode(token)
  console.log(userData.id);
  const [session,setSession] = useState([])

    useEffect(() => {
        getSessionDetails();
      }, []);
    
      const getSessionDetails = async () => {
        try {
          const response = await axios.get(`/getSession/${userData.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response.data);
          setSession(response.data)
          
        } catch (err) {
          console.log(err);
        }
      };


  return (
    <Box w="70%" margin="0 auto" minH="100vh" mt={12}>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Doctor</Th>
              <Th>Booked Date</Th>
              <Th>Session Date</Th>
              <Th>Session Time</Th>
            </Tr>
          </Thead>
          <Tbody>
          {session.map((session, index) => (
            <Tr key={index}>
              <Td>Dr. {session.doctorName}</Td>
              <Td>{session.bookedDate}</Td>
              <Td>{session.sessionDate}</Td>
              <Td>{session.timeSlot}</Td>
            </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserSession;
