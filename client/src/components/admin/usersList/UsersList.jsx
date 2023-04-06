import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Stack, Box, InputGroup, ButtonGroup, Input, Flex, Text } from "@chakra-ui/react";
import { ALL_USERS } from "../../../utils/ConstUrls";
import axios from "../../../utils/axios";

const UsersList = () => {
  const PAGE_SIZE = 6;
  const [state, setState] = useState("");
  const [usersList, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
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
      });
  };

  useEffect(() => {
    getUserDetails();
  }, [state, currentPage, searchValue]);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(ALL_USERS, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      console.log(response.data);
      setUsers(response.data);
      const filteredUsers = response.data.filter((user) =>
        user.userName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setTotalPages(Math.ceil(filteredUsers.length / PAGE_SIZE));
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const usersToDisplay = filteredUsers.slice(startIndex, endIndex);
      setUsers(usersToDisplay);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
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

  return (
    <Box marginLeft={80} marginTop={10}>
      <Text fontWeight="bold" fontSize="3xl">USERS LIST</Text>
      <Stack>
        <Box>
          <InputGroup size="sm">
            <Input
              className="border1"
              type="text"
              placeholder="Search by name"
              value={searchValue}
              onChange={handleSearch}
              border="white"
              marginTop={10}
              marginRight="130"
            />
          </InputGroup>
          <Table variant="simple" marginTop={10}>
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
                      <span style={{ color: "red" }}>inactive</span>
                    ) : (
                      <span style={{ color: "green" }}>active</span>
                    )}
                  </Td>
                  <Td>
                    {user.isBlocked ? (
                      <Button
                        onClick={() => {
                          if (
                            window.confirm("Are you sure you want to reject?")
                          ) {
                            unBlock(user._id);
                          }
                        }}
                        colorScheme="blue"
                        size="sm"
                      >
                        unblock
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          if (
                            window.confirm("Are you sure you want to reject?")
                          ) {
                            block(user._id);
                          }
                        }}
                        colorScheme="red"
                        size="sm"
                      >
                        block
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex className="parent-element" display="flex" justifyContent="flex-end" marginRight="150">
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
    </Box>
  );
};

export default UsersList;
