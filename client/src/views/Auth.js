import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { Redirect } from "react-router-dom";
import { Box, Flex, Spinner, Heading, VStack, Container } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useAuth();

  let body;

  if (authLoading) {
    body = (
      <Flex justify="center" mt={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="white"
          size="xl"
        />
      </Flex>
    );
  } else if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else {
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  }

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, brand.600, brand.800)"
      position="relative"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.400"
      >
        <Container maxW="container.sm" h="100vh">
          <Flex
            direction="column"
            align="center"
            justify="center"
            h="100%"
            py={8}
          >
            <VStack spacing={6} w="100%">
              <Heading
                as="h1"
                size="2xl"
                color="white"
                textAlign="center"
                fontWeight="bold"
              >
                LearnIt
              </Heading>
              <Heading
                as="h4"
                size="md"
                color="white"
                textAlign="center"
                fontWeight="normal"
              >
                Keep track of what you are learning
              </Heading>
              <Box w="100%" maxW="md">
                {body}
              </Box>
            </VStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Auth;
