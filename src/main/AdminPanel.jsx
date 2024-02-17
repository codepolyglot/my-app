import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AdminPanel = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/login");
  };

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
        <Button colorScheme="blue">Manage Users</Button>
        <Button colorScheme="red" ml={2} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default AdminPanel;
