import { useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";

function TimeSlot() {
  const [timeSlot, setTimeSlot] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTimeSlot([...timeSlot, { time: value, status: true }]);
    } else {
      setTimeSlot(timeSlot.filter((element) => element.time !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    console.log(timeSlot);
  };

  return (
    <Box
      p="6"
      bg="white"
      marginLeft="330"
      marginTop={10}
      maxWidth="1400"
      border="1px"
      borderColor="gray.200"
      rounded="lg"
      shadow="md"
      _hover={{ bg: "gray.100" }}
      dark={{
        bg: "gray.800",
        border: "1px",
        borderColor: "gray.700",
        _hover: { bg: "gray.700" },
      }}
    >
      <Text
        mb="2"
        fontSize="2xl"
        fontWeight="bold"
        tracking="tight"
        color="gray.900"
        dark={{ color: "white" }}
        textAlign="center"
      >
        Time Slot
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack direction={["column", "column", "row"]} spacing="4">
          <FormControl>
            <Checkbox
              id="vue-checkbox-list"
              value="07-08 am"
              name="slot"
              colorScheme="blue"
              onChange={handleCheckboxChange}
            >
              <FormLabel
                htmlFor="vue-checkbox-list"
                mb="0"
                fontSize="sm"
                fontWeight="medium"
                color="gray.900"
                dark={{ color: "gray.300" }}
              >
                07.00 - 08.00 am
              </FormLabel>
            </Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox
              id="vue-checkbox-list"
              value="10-11 am"
              name="slot"
              colorScheme="blue"
              onChange={handleCheckboxChange}
            >
              <FormLabel
                htmlFor="vue-checkbox-list"
                mb="0"
                fontSize="sm"
                fontWeight="medium"
                color="gray.900"
                dark={{ color: "gray.300" }}
              >
                10.00 - 11.00 am
              </FormLabel>
            </Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox
              id="vue-checkbox-list"
              value="01-02 pm"
              name="slot"
              colorScheme="blue"
              onChange={handleCheckboxChange}
            >
              <FormLabel
                htmlFor="vue-checkbox-list"
                mb="0"
                fontSize="sm"
                fontWeight="medium"
                color="gray.900"
                dark={{ color: "gray.300" }}
              >
                01.00 - 02.00 pm
              </FormLabel>
            </Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox
              id="vue-checkbox-list"
              value="04-05 pm"
              name="slot"
              colorScheme="blue"
              onChange={handleCheckboxChange}
            >
              <FormLabel
                htmlFor="vue-checkbox-list"
                mb="0"
                fontSize="sm"
                fontWeight="medium"
                color="gray.900"
                dark={{ color: "gray.300" }}
              >
                04.00 - 05.00 pm
              </FormLabel>
            </Checkbox>
          </FormControl>
          <FormControl>
            <Checkbox
              id="vue-checkbox-list"
              value="07-08 pm"
              name="slot"
              colorScheme="blue"
              onChange={handleCheckboxChange}
            >
              <FormLabel
                htmlFor="vue-checkbox-list"
                mb="0"
                fontSize="sm"
                fontWeight="medium"
                color="gray.900"
                dark={{ color: "gray.300" }}
              >
                07.00 - 08.00 pm
              </FormLabel>
            </Checkbox>
          </FormControl>
        </Stack>
        <Button type="submit" mt={4} colorScheme="blue">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default TimeSlot;
