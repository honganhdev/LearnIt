import {
  Box,
  Flex,
  Button,
  Image,
  Text,
  HStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { useAuth } from "../../hooks/useAuth";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useAuth();

  const bgColor = useColorModeValue("brand.600", "brand.700");
  const textColor = useColorModeValue("white", "gray.100");

  return (
    <Box bg={bgColor} px={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <HStack spacing={2}>
            <Image src={learnItLogo} alt="LearnIt Logo" boxSize="32px" />
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={textColor}
            >
              LearnIt
            </Text>
          </HStack>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Button
              as={RouterLink}
              to="/dashboard"
              variant="ghost"
              color={textColor}
              _hover={{ bg: "brand.700" }}
            >
              Dashboard
            </Button>
            <Button
              as={RouterLink}
              to="/about"
              variant="ghost"
              color={textColor}
              _hover={{ bg: "brand.700" }}
            >
              About
            </Button>
          </HStack>
        </HStack>
        <Spacer />
        <HStack spacing={4}>
          <Text color={textColor} fontWeight="semibold">
            Welcome {username.toUpperCase()}
          </Text>
          <Button
            onClick={logoutUser}
            colorScheme="gray"
            variant="solid"
            leftIcon={<Image src={logoutIcon} alt="Logout" boxSize="20px" />}
          >
            Logout
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavbarMenu;
