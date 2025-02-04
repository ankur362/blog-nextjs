import axios from 'axios';
import { handleApiError } from './utils';

const API_URL = 'http://localhost:5000';

export const fetchPosts = async (page = 1, limit = 5, search = '') => {
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      params: {
        _page: page,
        _limit: limit,
        q: search,
        _sort: 'createdAt',
        _order: 'desc'
      }
    });

    return {
      posts: response.data,
      total: parseInt(response.headers['x-total-count'] || '0')
    };
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, {
      ...postData,
      createdAt: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deletePost = async (id) => {
  try {
    await axios.delete(`${API_URL}/posts/${id}`);
    return true;
  } catch (error) {
    throw handleApiError(error);
  }
};