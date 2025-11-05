import apiClient from './apiClient';

const postService = {
  async getPosts() {
    return await apiClient.get('/posts');
  },

  async createPost(post) {
    return await apiClient.post('/posts', post);
  },

  async updatePost(id, post) {
    return await apiClient.put(`/posts/${id}`, post);
  },

  async deletePost(id) {
    return await apiClient.delete(`/posts/${id}`);
  },
};

export default postService;
