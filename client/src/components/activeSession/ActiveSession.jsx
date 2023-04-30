import React from "react";
import { useEffect, useState } from "react";
import { Box, Heading, Stack, Flex, Avatar, Badge } from "@chakra-ui/react";
import axios from "../../utils/axios";
import { USER_CHAT, DOC_CHAT } from "../../utils/ConstUrls";

const ActiveSession = ({handleActiveSessionId, currentUser, isDoctor }) => {
  const [activeSession, setActiveSession] = useState("");


  useEffect(()=>{
    const  getSession = async() => {
        try {
            if (isDoctor) {
            await axios.get(`doc/getActiveSession/${currentUser}`).then((res) => {
                setActiveSession(res.data);
                handleActiveSessionId(res.data.userId)
                console.log(res);
            });
        } else {
            await axios.get(`getActiveSession/${currentUser}`).then((res) => {
                setActiveSession(res.data);
                handleActiveSessionId(res.data.doctorId)
                console.log(res);
              });
        }
        
        } catch (error) {
            console.log(error)
        }
    }

   getSession()
  },[])


  // useEffect(()=>{
  //   getuserData = async()=>{
  //     if(isDoctor){
  //       //find userData for avatar
  //     }else{
  //       //find doctor for avatar
  //     }
  //   }
  //   getuserData()
  // },[])



  return (
    activeSession?._id &&
    <Box mt={4} backgroundColor="gray.100" h={20}>
  <Stack spacing="4">
    <Flex alignItems="center" mt={4} ml={2}>
      <Avatar
        size="md"
        name="John Doe"
        src={`https://bit.ly/dan-abramov`}
      />
      <Box ml="4">
        <Heading as="h2" fontSize="lg">
         {isDoctor ? activeSession?.userName : activeSession?.doctorName }
        </Heading>
        {/* <Box fontSize="sm" color="gray.500">
          Last message received 5 minutes ago
        </Box> */}
        <Badge variant="subtle" colorScheme="green" ml="2">
          Online
        </Badge>
      </Box>
    </Flex>
  </Stack>
</Box>

  );
};

export default ActiveSession;
