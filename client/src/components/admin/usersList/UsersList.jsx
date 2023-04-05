import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Stack, Box } from "@chakra-ui/react";
import { ALL_USERS } from "../../../utils/ConstUrls";
import axios from "../../../utils/axios";

const UsersList = () => {

  const [state,setState]=useState('')
  const [usersList,setUsers]=useState([]);
  const adminToken=localStorage.getItem("adminToken");
  const d = new Date();
  let time = d.getTime();

  const unBlock =async (id) =>{
    console.log(id)
   await axios.put(`/admin/unBlockUser/${id}`,{ headers: { 'Authorization': `Bearer ${adminToken}` } }).then(()=>{
    setState(time)
        
    })
  }

  const block =async (id) =>{
      console.log(id);
    await  axios.put(`/admin/blockUser/${id}`,{ headers: { 'Authorization': `Bearer ${adminToken}` } }).then(()=>{
      setState(time)
       
    })
  }


  useEffect(()=>{
    getUserDetails();
  },[state])

 

  const getUserDetails = async()=>{
    try{
      axios.get(ALL_USERS,{ headers: { 'Authorization': `Bearer ${adminToken}` } }).then((response)=>{
        console.log(response.data);
        setUsers(response.data);  
        
      }).catch((err)=>{
        console.log(err,"catch error in userFetching")
      })
    }catch(err){
      console.log(err)
    } 
    
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
          <Th>Status</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {usersList.map((user,index) => (
          <Tr key={index}>
            <Td>{user.userName}</Td>
            <Td>{user.email}</Td>
            <Td>{user.number}</Td>
            <Td>{user.isBlocked ? <span style={{color:"red"}}>inactive</span> : <span style={{color:"green"}}>active</span>}</Td>
            <Td>{
                    user.isBlocked ? <Button        onClick={() => {
                      if (window.confirm("Are you sure you want to reject?")) {
                        unBlock(user._id);
                      }
                    }} colorScheme="blue" size="sm">
                    unblock
                  </Button> :  <Button     onClick={() => {
                      if (window.confirm("Are you sure you want to reject?")) {
                        block(user._id);
                      }
                    }} colorScheme="red" size="sm">
                block
              </Button>
              }     
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

export default UsersList