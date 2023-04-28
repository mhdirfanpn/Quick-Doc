import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import Chat from "../../chat/Chat";
import axios from "../../../utils/axios";
import Conversations from "../../conversations/Conversations";

function Messenger({ isUser }) {
  let commonUser;
  const doctorToken = useSelector((state) => state.doctor.doctorToken);
  if (doctorToken) {
    commonUser = jwtDecode(doctorToken);
  }

  const userToken = useSelector((state) => state.user.userToken);
  if (userToken) {
    commonUser = jwtDecode(userToken);
  }

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        await axios.get("/conversation/" + commonUser.id).then((res) => {
          setConversations(res.data);
        });
      } catch (error) {}
    };
    getConversation();
  }, [commonUser.id]);


  useEffect(() => {
    const getMessages = async () => {
        try {
            const res = await axios.get(`/message/${currentChat._id}`);
            console.log(res);
            setMessages(res.data);
        } catch (err) {
            console.log(err);
        }
    } 
    getMessages();
},[currentChat]);

  console.log(messages);

  return (
    <Flex direction="row" mt={isUser ? 0 : 20}>
      <Box w="25%" h="100vh" borderRight="1px solid gray.200" p="4">
        <InputGroup mb="4">
          <InputLeftElement pointerEvents="none" children={<FaSearch />} />
          <Input placeholder="Search user..." />
        </InputGroup>
        <Box overflowY="auto" h="calc(100vh - 120px)">
          {conversations.map((c) => {
            return (
              <Box onClick={ () => setCurrentChat(c)}>
                {doctorToken ? (
                  <Conversations
                    key={c._id}
                    conversation={c}
                    currentUser={commonUser.id}
                    isDoctor={true}
                  />
                ) : (
                  <Conversations
                    key={c._id}
                    conversation={c}
                    currentUser={commonUser.id}
                    isDoctor={false}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box w="75%" h="100vh" p="4">
        {/* <Flex alignItems="center">
          <Avatar size="md" name="John Doe" src="https://bit.ly/dan-abramov" />
          <Box ml="4">
            <Heading as="h2" fontSize="lg">
              John Doe
            </Heading>
            <Box fontSize="sm" color="gray.500">
              Online
            </Box>
          </Box>
        </Flex> */}
        {currentChat ? (
          <>
            <Box overflowY="auto" h="calc(90vh - 200px)" mt="4">
              <Box>
                <Chat />
              </Box>
            </Box>

            <Box mt="4" mb={12}>
              <Textarea placeholder="Type your message..." mb="4" />
              <Button colorScheme="blue">Send</Button>
            </Box>
          </>
        ) : (
          <Text
            className="noConversation"
            mt="10%"
            fontSize="50px"
            color="gray.300"
            cursor="default"
            textAlign="center"
          >
            Open a conversation to start chat
          </Text>
        )}
      </Box>
    </Flex>
  );
}

export default Messenger;
