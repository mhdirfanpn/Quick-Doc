import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Switch,
  Stack,
  Box,
  InputGroup,
  ButtonGroup,
  Input,
  Flex,
  Text,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { ALL_USERS } from "../../../utils/ConstUrls";
import axios from "../../../utils/axios";
import toast, { Toaster } from "react-hot-toast";
import debounce from "lodash.debounce"; // import debounce function from lodash library

const UsersList = () => {
  const PAGE_SIZE = 6;
  const [state, setState] = useState("");
  const [usersList, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const adminToken = localStorage.getItem("adminToken");
  const d = new Date();
  let time = d.getTime();

  const unBlock = async (id) => {
    console.log(id);
    await axios
      .put(`/admin/unBlockUser/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then(() => {
        setState(time);
        toast.success("unblocked");
      });
  };

  const block = async (id) => {
    console.log(id);
    await axios
      .put(`/admin/blockUser/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then(() => {
        setState(time);
        toast.error("blocked");
      });
  };

  useEffect(() => {
    getUserDetails();
  }, [state, searchTerm, currentPage]);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(ALL_USERS, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      console.log(response.data);
      let filteredUsers = response.data;
      if (searchTerm) {
        filteredUsers = response.data.filter((user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setTotalPages(Math.ceil(filteredUsers.length / PAGE_SIZE));
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const usersToDisplay = filteredUsers.slice(startIndex, endIndex);
      setUsers(usersToDisplay);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 700);

  return (
    <Box marginLeft={80} marginTop={10}>
      <Text fontWeight="bold" fontSize="3xl">
        USERS LIST
      </Text>
      <Stack>
        <Box>
          <InputGroup size="sm">
            <Input
              className="border1"
              type="text"
              placeholder="Search by name"
              border="white"
              marginTop={10}
              marginRight="130"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>Manage users</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Contact</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {usersList.map((user, index) => (
                  <Tr key={index}>
                    <Td>{user.userName}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.number}</Td>
                    <Td>
                      {user.isBlocked ? (
                        <span style={{ color: "red" }}>blocked</span>
                      ) : (
                        <span style={{ color: "green" }}>active</span>
                      )}
                    </Td>

                    <Td>
                      <Switch
                        colorScheme={user.isBlocked ? "red" : "green"}
                        isChecked={user.isBlocked}
                        onChange={() => {
                          user.isBlocked ? unBlock(user._id) : block(user._id);
                        }}
                        size="md"
                      />
                    </Td>
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
                disabled={currentPage === 1}
                onClick={() => handlePrevPage()}
                variant="outline"
              >
                Previous
              </Button>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => handleNextPage()}
                ml="-px"
              >
                Next
              </Button>
            </ButtonGroup>
          </Flex>
        </Box>
      </Stack>
      <Toaster />
    </Box>
  );
};

export default UsersList;
