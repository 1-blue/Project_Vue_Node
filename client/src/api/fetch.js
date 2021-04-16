import axios from 'axios';

async function fetchLogout(){
  try {
    const data = await axios.get('/auth/logout');
    return data.data;
  } catch (error) {
    return error;
  }
}

async function fetchCommunity(){
  let data = await axios.get('/community');
  return data.data;
}

async function fetchPost(id){
  let data = await axios.get(`/post/${id}`);
  return data.data;
}

async function fetchComments(id){
  let data = await axios.get(`/comment/${id}`);
  return data.data;
}

export {
  fetchLogout,
  fetchCommunity,
  fetchPost,
  fetchComments
}