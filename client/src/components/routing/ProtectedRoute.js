import { Route, Redirect } from "react-router-dom";
import { Center, Spinner, Box } from "@chakra-ui/react";
import NavbarMenu from "../layout/NavbarMenu";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useAuth();

  if (authLoading) {
    return (
      <Center h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Box minH="100vh" bg="gray.50">
            <NavbarMenu />
            <Component {...rest} {...props} />
          </Box>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
