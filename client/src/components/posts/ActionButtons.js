import { IconButton, HStack, Image, Link } from "@chakra-ui/react";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { usePosts } from "../../hooks/usePosts";

const ActionButtons = ({ url, _id }) => {
  const { deletePost, findPost, setShowUpdatePostModal } = usePosts();

  const choosePost = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };

  return (
    <HStack spacing={1}>
      {url && (
        <IconButton
          as={Link}
          href={url}
          target="_blank"
          size="sm"
          variant="ghost"
          aria-label="Open link"
          icon={<Image src={playIcon} alt="play" boxSize="20px" />}
        />
      )}
      <IconButton
        onClick={() => choosePost(_id)}
        size="sm"
        variant="ghost"
        colorScheme="blue"
        aria-label="Edit post"
        icon={<Image src={editIcon} alt="edit" boxSize="18px" />}
      />
      <IconButton
        onClick={() => deletePost(_id)}
        size="sm"
        variant="ghost"
        colorScheme="red"
        aria-label="Delete post"
        icon={<Image src={deleteIcon} alt="delete" boxSize="18px" />}
      />
    </HStack>
  );
};

export default ActionButtons;
