import { Table, Thead, Tbody, Tr, Th, Td,  } from "@chakra-ui/react";

let users=[{
    id:'1',
    email:'a@gmail.com',
    status:'Active',
    name:'sample',
    contact:'1234567890',
}]

function DoctorsList() {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Contact</Th>
          <Th>Specialization</Th>
          <Th>Experience</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.contact}</Td>
            <Td>Cardiology</Td>
            <Td>3 years</Td>
            {/* <Td>
              <Button colorScheme="blue" size="sm" mr={2}>
                Edit
              </Button>
              <Button colorScheme="red" size="sm">
                Delete
              </Button>
            </Td> */}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default DoctorsList