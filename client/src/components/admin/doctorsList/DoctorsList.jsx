import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Stack, Button  } from "@chakra-ui/react";
import axios from "../../../utils/axios";
import { ALL_DOCTORS } from "../../../utils/ConstUrls";
import { useNavigate } from "react-router-dom";



const DoctorsList = () => {


  const navigate=useNavigate()
  const [doctorsList,setDoctors]=useState([]);
  const adminToken=localStorage.getItem("adminToken");

  useEffect(()=>{
    getDoctorsDetails();
  },[])

  const getDoctorsDetails = async()=>{
    try{
      axios.get(ALL_DOCTORS,{ headers: { 'Authorization': `Bearer ${adminToken}` } }).then((response)=>{
        console.log(response.data);
        setDoctors(response.data);  
        
      }).catch((err)=>{
        console.log(err,"catch error in doctorFetching")
      })
    }catch(err){
      console.log(err)
    } 
    
  }

  const viewMore = (id) =>{
    console.log(id)
    navigate(`/doctor-card/${id}`)
  }


  return (
    <Box
    marginLeft={80}
    marginTop={10}
   
    >

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
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {doctorsList.map((doctor,index) => (
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

export default DoctorsList