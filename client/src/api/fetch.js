import axios from 'axios';

// 로그아웃시도
async function fetchLogout(){
  try {
    const data = await axios.get('/auth/logout');
    return data.data;
  } catch (error) {
    return error;
  }
}

// 채팅방목록받기
async function fetchRoom(){
  try {
    const data = await axios.get('/talk/room');
    return data.data;
  } catch (error) {
    return error;
  }
}

// 채팅목록받기
async function fetchChatting(name){
  try {
    const data = await axios.get(`/talk/chatting/${name}`);
    return data.data;
  } catch (error) {
    return error;
  }
}

// room삭제권한확인
async function fetchRoomDeleteAuth(userNickname){
  try {
    const data = await axios.get(`/talk/room/${userNickname}`);
    return data.data;
  } catch (error) {
    return error;
  }
}

// room삭제
async function fetchRoomDelete(name){
  try {
    const data = await axios.delete(`/talk/room/${name}`);
    return data.data;
  } catch (error) {
    return error;
  }
}

// 전체게시글 요약정보요청
async function fetchCommunity(){
  try {
    const data = await axios.get(`/community`);
    return data.data;
  } catch (error) {
    return error;
  }
}

// 해당게시글 상세정보요청
async function fetchPost(postId){
  try {
    const data = await axios.get(`/community/${postId}`);
    return data.data;
  } catch (error) {
    return error;
  }
}

// 해당게시글의 댓글 불러오기
async function fetchComment(postId){
  try {
    const data = await axios.get(`/community/comment/${postId}`);
    return data.data;
  } catch (error) {
    return error;
  }
}

export {
  fetchLogout,
  fetchRoom,
  fetchChatting,
  fetchRoomDeleteAuth,
  fetchRoomDelete,
  fetchCommunity,
  fetchPost,
  fetchComment,
}