import { useEffect } from "react";
import {
  Box,
  Container,
  Spinner,
  Button,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  IconButton,
  Tooltip,
  useToast,
  Flex,
  Center,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";
import SinglePost from "../components/posts/SinglePost";
import { AddPostModal } from "../components/posts/AddPostModal";
import { UpdatePostModal } from "../components/posts/UpdatePostModal";

const Dashboard = () => {
  const toast = useToast();

  // Custom hooks
  const {
    authState: {
      user: { username },
    },
  } = useAuth();

  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = usePosts();

  // Get all posts on mount
  useEffect(() => getPosts(), []);

  // Show toast notifications
  useEffect(() => {
    if (show) {
      const statusMap = {
        success: "success",
        danger: "error",
        warning: "warning",
        info: "info",
      };

      toast({
        title: message,
        status: statusMap[type] || "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      setShowToast({ show: false, message: "", type: null });
    }
  }, [show, message, type, toast, setShowToast]);

  let body = null;
  if (postsLoading) {
    body = (
      <Center h="400px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
      </Center>
    );
  } else if (posts.length === 0) {
    body = (
      <Container maxW="container.md" mt={10}>
        <Box
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          p={8}
          textAlign="center"
        >
          <VStack spacing={4}>
            <Heading size="xl">Hi {username}!</Heading>
            <Heading size="md" fontWeight="normal">
              Welcome
            </Heading>
            <Text color="gray.600">
              Click button below to track your first skill to learn
            </Text>
            <Button
              colorScheme="brand"
              size="lg"
              onClick={() => setShowAddPostModal(true)}
            >
              LearnIt!
            </Button>
          </VStack>
        </Box>
      </Container>
    );
  } else {
    body = (
      <Container maxW="container.xl" py={8}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {posts.map((post) => (
            <SinglePost key={post._id} post={post} />
          ))}
        </SimpleGrid>
        {/* Floating Add Button */}
        <Tooltip label="Add a new post" placement="left">
          <IconButton
            icon={<AddIcon />}
            colorScheme="brand"
            size="lg"
            isRound
            position="fixed"
            bottom={8}
            right={8}
            boxShadow="lg"
            onClick={() => setShowAddPostModal(true)}
            aria-label="Add post"
            _hover={{ transform: "scale(1.1)" }}
            transition="transform 0.2s"
          />
        </Tooltip>
      </Container>
    );
  }

  return (
    <Box>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
    </Box>
  );
};

export default Dashboard;
