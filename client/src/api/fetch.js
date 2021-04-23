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

// 게시글정보요청
async function fetchCommunity(){
  try {
    const data = await axios.get(`/community`);
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
}