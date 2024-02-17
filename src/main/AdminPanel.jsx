import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Spacer,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UserRow = ({ user }) => (
  <Tr>
    <Td>{user.id}</Td>
    <Td>{user.username}</Td>
    <Td>{user.email}</Td>
  </Tr>
);

const AdminPanel = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/login");
  };

  // Sample user data
  const users = [
    { id: 1, username: "user1", email: "user1@example.com" },
    { id: 2, username: "user2", email: "user2@example.com" },
    { id: 3, username: "user3", email: "user3@example.com" },
    { id: 4, username: "user4", email: "user4@example.com" },
    { id: 5, username: "user5", email: "user5@example.com" },
    { id: 6, username: "user6", email: "user6@example.com" },
    { id: 7, username: "user7", email: "user7@example.com" },
    { id: 8, username: "user8", email: "user8@example.com" },
    { id: 9, username: "user9", email: "user9@example.com" },
    { id: 10, username: "user10", email: "user10@example.com" },
  ];

  // Logic for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Admin Panel
      </Heading>
      <Box bg="white" p={4} borderRadius="md" boxShadow="md">
        <Text fontSize="xl" mb={2}>
          Welcome, Admin!
        </Text>
        <Text mb={4}>You have full access to the admin features.</Text>
        <Flex mb={4}>
          <Input
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mr={2}
          />
          <Button colorScheme="blue" mr={2}>
            Manage Users
          </Button>
          <Spacer />
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
        <Divider mb={4} />
        <Heading size="md" mb={2}>
          Users
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Username</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentUsers
              .filter((user) =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
          </Tbody>
        </Table>
        {/* Pagination */}
        <Box mt={4}>
          <Button
            isDisabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            mr={2}
          >
            Previous
          </Button>
          <Button
            isDisabled={indexOfLastUser >= users.length}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPanel;
