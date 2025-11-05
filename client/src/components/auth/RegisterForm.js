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

const RegisterForm = () => {
  // Custom hook
  const { registerUser } = useAuth();

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <form onSubmit={register}>
        <VStack spacing={4} align="stretch">
          <AlertMessage info={alert} />
          <FormControl isRequired>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChangeRegisterForm}
              bg="white"
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChangeRegisterForm}
              bg="white"
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChangeRegisterForm}
              bg="white"
            />
          </FormControl>
          <Button type="submit" colorScheme="green" size="lg" width="full">
            Register
          </Button>
        </VStack>
      </form>
      <Text mt={4} textAlign="center" color="white">
        Already have an account?{" "}
        <Button
          as={RouterLink}
          to="/login"
          variant="link"
          colorScheme="blue"
          size="sm"
        >
          Login
        </Button>
      </Text>
    </Box>
  );
};

export default RegisterForm;
