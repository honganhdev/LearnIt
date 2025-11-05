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
  VStack,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { usePosts } from "../../hooks/usePosts";

export const AddPostModal = () => {
  // Custom hook
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    usePosts();
  // State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const closeDialog = () => {
    resetAddPostData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPostData();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddPostData = () => {
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddPostModal(false);
  };

  return (
    <Modal isOpen={showAddPostModal} onClose={closeDialog} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>What do you want to Learn?</ModalHeader>
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
                  onChange={onChangeNewPostForm}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Enter description"
                  name="description"
                  value={description}
                  onChange={onChangeNewPostForm}
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
                  onChange={onChangeNewPostForm}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={closeDialog}>
              Cancel
            </Button>
            <Button colorScheme="brand" type="submit">
              LearnIt!
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
