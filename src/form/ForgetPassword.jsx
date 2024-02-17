import React, { useState } from "react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Spinner, // Import Spinner for loading state
} from "@chakra-ui/react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", error: false });

  const handleClick = () => {
    setLoading(true);
    setFeedback({ message: "", error: false });

    // You can use an API or a library to send the email
    // For simplicity, let's assume we have a function called sendResetEmail
    sendResetEmail(email);
  };

  const sendResetEmail = (email) => {
    // Implement your logic to send the reset email here
    // This can involve making an API request or using a library like Nodemailer

    // Example code using fetch API
    fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send reset email");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setFeedback({ message: "Reset email sent successfully", error: false });
      })
      .catch((error) => {
        setLoading(false);
        setFeedback({ message: "Error sending reset email", error: true });
        console.error("Error sending reset email:", error);
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You'll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            colorScheme={email ? "yellow" : "gray"}
            color={"white"}
            disabled={!email || loading}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleClick}
          >
            {loading ? <Spinner size="sm" /> : "Request Reset"}
          </Button>
          {feedback.message && (
            <Text color={feedback.error ? "red.500" : "green.500"}>
              {feedback.message}
            </Text>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ForgetPassword;
