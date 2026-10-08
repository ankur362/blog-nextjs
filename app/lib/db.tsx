import axios from 'axios';
import { handleApiError } from './utils';

const API_URL = 'http://localhost:5000';

export type Post = {
  id: string | number;
  title: string;
  author: string;
  content: string;
  createdAt?: string;
};

export type PostInput = Pick<Post, 'title' | 'author' | 'content'>;

export const fetchPosts = async (page = 1, limit = 5, search = '') => {
  try {
    const response = await axios.get<Post[]>(`${API_URL}/posts`, {
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

export const fetchPostById = async (id: string | number) => {
  try {
    const response = await axios.get<Post>(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createPost = async (postData: PostInput) => {
  try {
    const response = await axios.post<Post>(`${API_URL}/posts`, {
      ...postData,
      createdAt: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updatePost = async (id: string | number, postData: PostInput) => {
  try {
    const response = await axios.put<Post>(`${API_URL}/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deletePost = async (id: string | number) => {
  try {
    await axios.delete(`${API_URL}/posts/${id}`);
    return true;
  } catch (error) {
    throw handleApiError(error);
  }
};
