import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  // Custom hook
  const { loginUser } = useAuth();

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <form onSubmit={login}>
        <VStack spacing={4} align="stretch">
          <AlertMessage info={alert} />
          <FormControl isRequired>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChangeLoginForm}
              bg="white"
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChangeLoginForm}
              bg="white"
            />
          </FormControl>
          <Button type="submit" colorScheme="green" size="lg" width="full">
            Login
          </Button>
        </VStack>
      </form>
      <Text mt={4} textAlign="center" color="white">
        Don't have an account?{" "}
        <Button
          as={RouterLink}
          to="/register"
          variant="link"
          colorScheme="blue"
          size="sm"
        >
          Register
        </Button>
      </Text>
    </Box>
  );
};

export default LoginForm;
