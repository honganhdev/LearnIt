// Validation utilities for server-side input validation

const validateUsername = (username) => {
  if (!username || typeof username !== 'string') {
    return { valid: false, message: 'Username is required' };
  }

  if (username.length < 3 || username.length > 20) {
    return { valid: false, message: 'Username must be between 3 and 20 characters' };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, message: 'Username can only contain letters, numbers, and underscores' };
  }

  return { valid: true };
};

const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required' };
  }

  if (password.length < 6 || password.length > 50) {
    return { valid: false, message: 'Password must be between 6 and 50 characters' };
  }

  return { valid: true };
};

const validatePost = (post) => {
  const { title, description, url, status } = post;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return { valid: false, message: 'Title is required' };
  }

  if (title.length > 100) {
    return { valid: false, message: 'Title must be less than 100 characters' };
  }

  if (description && description.length > 500) {
    return { valid: false, message: 'Description must be less than 500 characters' };
  }

  if (url && url.length > 0) {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch (error) {
      return { valid: false, message: 'Invalid URL format' };
    }
  }

  const validStatuses = ['TO LEARN', 'LEARNING', 'LEARNED'];
  if (status && !validStatuses.includes(status)) {
    return { valid: false, message: 'Invalid status value' };
  }

  return { valid: true };
};

module.exports = {
  validateUsername,
  validatePassword,
  validatePost,
};
