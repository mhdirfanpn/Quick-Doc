import { useState } from 'react';
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  Box,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';

const TableWithPagination = ({ itemsPerPage = 5 }) => {

    const data = [
        {
          id: 1,
          name: "Jwefweweohn Doe",
          email: "john.doe@example.com"
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com"
        },
        {
          id: 3,
          name: "Bob Johnson",
          email: "bob.johnson@example.com"
        },
        {
          id: 4,
          name: "Sarah Lee",
          email: "sarah.lee@example.com"
        },
        {
          id: 5,
          name: "David Brown",
          email: "david.brown@example.com"
        },
        {
          id: 6,
          name: "Emily Davis",
          email: "emily.davis@example.com"
        }
      ];
      
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  return (
    <Box>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // reset to first page when searching
        }}
        mb={4}
      />
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentItems.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ButtonGroup mt={4} isAttached>
        <Button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          variant="outline"
        >
          Previous
        </Button>
        <Button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          ml="-px" // fix for attached buttons styling
        >
          Next
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default TableWithPagination;

