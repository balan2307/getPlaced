// import Post from '@/Server/models/Post';
import axios from "axios";

// const base_url='http://localhost:3000'
import { successHandler, errorHandler } from "./helper";

export const createPost = async (fd) => {
  return axios.post(`/user/post`, fd).then(successHandler).catch(errorHandler);
};

export const getPost = async (id) => {
  return axios.get(`/user/post/${id}`).then(successHandler).catch(errorHandler);
};

export const getAllPosts = async () => {
  return axios.get(`/user/posts`).then(successHandler).catch(errorHandler);
};

export const getTaggedPosts = async (tag) => {
  return axios.get(`/posts/${tag}`).then(successHandler).catch(errorHandler);
};

export const editPost = async (id, fd) => {
  return axios
    .patch(`/user/post/${id}`, fd)
    .then(successHandler)
    .catch(errorHandler);
};

export const deletePost = async (id) => {
  return await axios
    .delete(`/user/post/${id}`)
    .then(successHandler)
    .catch(errorHandler);
};

export const upvotePost = async (postid, userid) => {
  return axios
    .patch(`/user/${userid}/post/${postid}/upvote`)
    .then(successHandler)
    .catch(errorHandler);
};

export const downvotePost = async (postid, userid) => {
  return axios
    .patch(`/user/${userid}/post/${postid}/downvote`)
    .then(successHandler)
    .catch(errorHandler);
};

export const getPostsPages = async (tag, currpage, perpage) => {
  return axios
    .get(`/posts/pages/${tag}`, {
      params: {
        page: currpage,
        limit: perpage,
      },
    })
    .then(successHandler)
    .catch(errorHandler);

  // return response
};

export const getUserPosts = async (id, currpage, perpage) => {


  return await axios
    .get(`/user/posts/${id}`, {
      params: {
        page: currpage,
        limit: perpage,
      },
    })
    .then((posts) => {
      return posts;
    })
    .catch((err) => {
      throw err;
    });
};

export const searchPost = async (search, currpage, perpage) => {
  return axios
    .get("/posts/search", {
      params: {
        search: search,
        page: currpage,
        limit: perpage,
      },
    })
    .then(successHandler)
    .catch(errorHandler);
};
