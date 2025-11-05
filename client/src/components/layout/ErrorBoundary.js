import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Container,
  Button,
  Box,
  VStack,
  HStack,
  Code,
} from '@chakra-ui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by Error Boundary:', error, errorInfo);
    }

    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxW="container.lg" mt={10}>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="md"
            p={8}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Oops! Something went wrong
            </AlertTitle>
            <AlertDescription maxW="md" mb={4}>
              We're sorry for the inconvenience. An unexpected error has occurred.
            </AlertDescription>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box w="100%" mt={4} mb={4}>
                <Box fontWeight="bold" mb={2}>Error Details:</Box>
                <Code
                  display="block"
                  whiteSpace="pre"
                  p={4}
                  borderRadius="md"
                  fontSize="sm"
                  overflow="auto"
                  maxH="300px"
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </Code>
              </Box>
            )}
            <HStack spacing={4} mt={4}>
              <Button onClick={this.handleReset} variant="outline" colorScheme="red">
                Try Again
              </Button>
              <Button
                onClick={() => (window.location.href = '/')}
                colorScheme="red"
              >
                Go to Home
              </Button>
            </HStack>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
