import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from "./constants";
import postService from "../services/postService";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //state

  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get All Posts
  const getPosts = async () => {
    const response = await postService.getPosts();
    if (response.success) {
      dispatch({
        type: POSTS_LOADED_SUCCESS,
        payload: response.posts,
      });
    } else {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  // Add Post
  const addPost = async (newPost) => {
    const response = await postService.createPost(newPost);
    if (response.success) {
      dispatch({ type: ADD_POST, payload: response.post });
    }
    return response;
  };

  // Delete Post
  const deletePost = async (postId) => {
    const response = await postService.deletePost(postId);
    if (response.success) {
      dispatch({ type: DELETE_POST, payload: postId });
    }
    return response;
  };

  // Find Post for updating
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispatch({ type: FIND_POST, payload: post });
  };

  // Update Post
  const updatePost = async (updatedPost) => {
    const response = await postService.updatePost(updatedPost._id, updatedPost);
    if (response.success) {
      dispatch({
        type: UPDATE_POST,
        payload: response.post,
      });
    }
    return response;
  };
  // post context data

  const postContextData = {
    postState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    findPost,
    updatePost,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
