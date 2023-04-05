import { Table, Thead, Tbody, Tr, Th, Td, Button, Box, Stack,} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { ALL_DOC_REQ } from "../../../utils/ConstUrls";
import { useNavigate } from "react-router-dom";




const DoctorsRequest = () => {

  const navigate = useNavigate()

  const [doctorsReq,setDocReq] = useState([]);
  const adminToken=localStorage.getItem("adminToken")

  useEffect(()=>{
    getDoctorsReq();
  },[])

  const getDoctorsReq = async()=>{
    try {

      axios.get(ALL_DOC_REQ,{ headers: { 'Authorization': `Bearer ${adminToken}`}}).then((response)=>{
        console.log(response.data);
        setDocReq(response.data);

      }).catch((err)=>{
        console.log(err,"catch error in doctorFetching");
      })
      
    } catch (err) {
      console.log(err);
    }
  }

  const viewMore = (id) =>{
    console.log(id)
    navigate(`/doctor-card/${id}`)
  }

  return (
    <Box marginLeft={80} marginTop={10}>
      <Stack>
        <Box>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Contact</Th>
                <Th>Specialization</Th>
                <Th>Experience</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
                {doctorsReq.map((doctor,index) => (
                  <Tr key={index}>
                    <Td>{doctor.fullName}</Td>
                    <Td>{doctor.email}</Td>
                    <Td>{doctor.number}</Td>
                    <Td>Cardiology</Td>
                    <Td>3 years</Td>
                    <Td>
              <Button colorScheme="blue" size="sm" mr={2} onClick={()=>viewMore(doctor._id)}>
                view more
              </Button>
            </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Box>
  );
}

export default DoctorsRequest;
