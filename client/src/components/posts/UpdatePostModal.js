import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  FormHelperText,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { usePosts } from "../../hooks/usePosts";

export const UpdatePostModal = () => {
  // Custom hook
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = usePosts();
  // State
  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => setUpdatedPost(post), [post]);

  const { title, description, url, status } = updatedPost;

  const onChangeUpdatedPostForm = (event) =>
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });

  const closeDialog = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <Modal isOpen={showUpdatePostModal} onClose={closeDialog} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Make progress?</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={title}
                  onChange={onChangeUpdatedPostForm}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Enter description"
                  name="description"
                  value={description}
                  onChange={onChangeUpdatedPostForm}
                  rows={3}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Tutorial URL</FormLabel>
                <Input
                  type="text"
                  placeholder="https://youtube.com/..."
                  name="url"
                  value={url}
                  onChange={onChangeUpdatedPostForm}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Status</FormLabel>
                <Select
                  name="status"
                  value={status}
                  onChange={onChangeUpdatedPostForm}
                >
                  <option value="TO LEARN">TO LEARN</option>
                  <option value="LEARNING">LEARNING</option>
                  <option value="LEARNED">LEARNED</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={closeDialog}>
              Cancel
            </Button>
            <Button colorScheme="brand" type="submit">
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
