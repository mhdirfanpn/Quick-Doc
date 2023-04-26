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
  TableCaption,
  Button,
  ButtonGroup,
  Flex,
  Center,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";

const LIMIT = 3;


const UserSession = () => {
  const token = localStorage.getItem("userToken");
  const userData = jwtDecode(token);
  console.log(userData.id);
  const [session, setSession] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalSession, setTotalSessions] = useState(0);

  useEffect(() => {
    getSessionDetails();
  }, [activePage]);

  const getSessionDetails = async () => {
    try {
      const response = await axios.get(`/getSession/${userData.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: activePage,
          size: LIMIT,
        },
      });
      console.log(response.data);
      setSession(response.data.session);
      setTotalSessions(response.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box w="70%" margin="0 auto" minH="100vh" mt={12}>
      <TableContainer>
        <Table variant="simple">
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
      <Flex
        className="parent-element"
        display="flex"
        justifyContent="flex-end"
        marginRight="150"
      >
        <ButtonGroup mt={10}>
        <Button
  onClick={() => setActivePage(activePage - 1)}
  variant="outline"
  isDisabled={activePage === 1}
>
  Previous Page
</Button>


<Button onClick={() => setActivePage(activePage + 1)} ml="-px" isDisabled={activePage === Math.ceil(totalSession / LIMIT)}>
  Next
</Button>

        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default UserSession;
