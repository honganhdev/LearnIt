import { Box, Badge, Text, Heading, Flex, useColorModeValue } from "@chakra-ui/react";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  const getBorderColor = (status) => {
    switch (status) {
      case "LEARNED":
        return "success.500";
      case "LEARNING":
        return "warning.500";
      default:
        return "danger.500";
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case "LEARNED":
        return "green";
      case "LEARNING":
        return "orange";
      default:
        return "red";
    }
  };

  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      borderWidth="2px"
      borderColor={getBorderColor(status)}
      boxShadow="md"
      p={4}
      transition="all 0.3s"
      _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
    >
      <Flex justify="space-between" align="start" mb={3}>
        <Box flex="1">
          <Heading size="md" mb={2}>
            {title}
          </Heading>
          <Badge colorScheme={getBadgeColor(status)} fontSize="sm">
            {status}
          </Badge>
        </Box>
        <ActionButtons url={url} _id={_id} />
      </Flex>
      {description && (
        <Text color="gray.600" fontSize="sm">
          {description}
        </Text>
      )}
    </Box>
  );
};

export default SinglePost;
