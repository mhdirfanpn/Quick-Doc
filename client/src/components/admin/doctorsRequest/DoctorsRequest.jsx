import { Table, Thead, Tbody, Tr, Th, Td, Box, Stack, Button, Flex,Input,InputGroup, ButtonGroup, Text  } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { ALL_DOC_REQ } from "../../../utils/ConstUrls";
import { useNavigate } from "react-router-dom";




const DoctorsRequest = () => {

  const PAGE_SIZE = 6;
  const navigate = useNavigate()
  const [doctorsReq,setDocReq] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const adminToken=localStorage.getItem("adminToken")

  useEffect(()=>{
    getDoctorsReq();
  },[currentPage, searchValue])

  const getDoctorsReq = async()=>{
    try {

        const response = await axios.get(ALL_DOC_REQ,{ headers: { 'Authorization': `Bearer ${adminToken}`}})
        console.log(response.data);
        setDocReq(response.data);
        const filteredDoctors = response.data.filter((doctor) =>
        doctor.fullName.toLowerCase().includes(searchValue.toLowerCase())
        ); setTotalPages(Math.ceil(filteredDoctors.length / PAGE_SIZE));
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const usersToDisplay = filteredDoctors.slice(startIndex, endIndex);
        setDocReq(usersToDisplay); 
    } catch (err) {
      console.log(err);
    }
  }

  const viewMore = (id) =>{
    console.log(id)
    navigate(`/doctor-card/${id}`)
  }

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
      <Text fontWeight="bold" fontSize="3xl">DOCTORS REQUEST</Text>
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
                <Th>Specialization</Th>
                <Th>Contact</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
                {doctorsReq.map((doctor,index) => (
                  <Tr key={index}>
                    <Td>{doctor.fullName}</Td>
                    <Td>{doctor.email}</Td>
                    <Td>{doctor.specialization}</Td>
                    <Td>{doctor.number}</Td>
                    <Td>
              <Button colorScheme="blue" size="sm" mr={2} onClick={()=>viewMore(doctor._id)}>
                view more
              </Button>
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
}

export default DoctorsRequest;
