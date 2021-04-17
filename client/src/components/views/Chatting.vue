<template>
  <section id="Chatting__container" v-if="dataReady">
    <div v-if="isDeleteSuccess">
      채팅방 삭제완료
    </div>

    <div v-if="rooms && !isJoinRoom">
      <h1>Chatting</h1>
      <h1>채팅방 생성</h1>
      <input type="text" v-model="roomName"/>
      <span @click="createdRoom">생성</span>
      <br>

      <ul v-if="!isJoinRoom" class="room__list">
        <li v-for="room in rooms" :key="room.id">
          {{ room.name }}
          <span @click="joinRoom(room.name)">입장</span>
          <span @click="deleteRoom(room.name)" v-if="xxx(room.name)">삭제</span>
        </li>
      </ul>
    </div>

    <ul v-else-if="isJoinRoom" class="chat__list">
      새로운채팅방
      <input type="text" v-model="chat"/>
      <span @click="sendMyChatting">전송</span>
      <span @click="leaveRoom">나가기</span>
      <li v-for="(chat__, index) in chatData" :key="index">
        {{ chat__ }}
      </li>
    </ul>

    <div v-else>
      접근권한이 없습니다. 로그인후에 접근해주세요
    </div>
  </section>
</template>

<script>
// 소켓관련
import io from 'socket.io-client';
import { fetchRoom, fetchChatting, fetchRoomDeleteAuth, fetchRoomDelete } from '../../api/fetch.js';

export default {
  name: 'Chatting',
  data(){
    return{
      dataReady: false,   // 데이터 전송다받으면 화면그리기
      socket: null,       // socket.io 값 들어갈 변수
      rooms: {},          // room들의 목록 들어갈 변수
      roomName: "",       // room을 만들 때 입력받는 room의 이름을 v-model한 변수
      isJoinRoom: "",     // room에 들어갔는지 확인할 변수
      chat: "",           // 현재채팅 v-model
      chatData: [],       // 채팅데이터들 넣어들 변수
      deleteAuthRooms: [],// 삭제권한있는 room들
      isDeleteSuccess: false,   //채팅방삭제완료인지 체크
    }
  },
  methods: {
    async getRoomList(){
      // 채팅방 목록 가져오기
      this.rooms = await fetchRoom();

      // 에러처리된경우 (로그인하지않고 접근한경우)
      if(this.rooms.message){
        this.rooms = false;
      }
    },
    async createdRoom(){
      // 애한테 await하는 방법이 필요함
      this.socket.emit("createdRoom", this.roomName, this.nickname);

      // 밑에 두개 넣을이유는
      // 방생성시 바로 데이터를 업데이트안받으면
      // 현재페이지 리로드할 때 까지 화면에 데이터가 붙지않음
      // 할려고 했는데 socket.emit이 대기를 하지않아서 실패

      // 현재 room정보 가져옴
      this.getRoomList();

      // 유저의 채팅방 삭제권한확인 (유저가 만든 room데이터만 받아옴)
      this.deleteAuthRooms = await fetchRoomDeleteAuth(this.nickname);
    },
    async deleteRoom(name){
      const data = await fetchRoomDelete(name)
      
      if(data === "success"){
        this.isDeleteSuccess = true;
        this.getRoomList();
      }
    },
    async joinRoom(name){
      await this.socket.emit("joinRoom", name, this.nickname);
      this.isJoinRoom = true;

      // 기존 채팅기록 불러와서 chatData에 넣기
      const data = await fetchChatting(name);
      data.forEach(v => this.chatData.push(`${v.User.nickname} : ${v.content}`));
    },
    async leaveRoom(){
      await this.socket.emit("leaveRoom");
      this.isJoinRoom = false;

      // 채팅기록 삭제처리
      this.chatData.length = 0;
    },
    async sendMyChatting(){
      await this.socket.emit("sendMyChatting", this.chat);
    },
    xxx(roomName){
      // 방에 대해 삭제권한이 있는지 확인후 권한부여
      let isAuth = false;
      this.deleteAuthRooms.forEach(v => {
        if(v.name === roomName){
          isAuth = true;
        }
      });
      
      return isAuth;
    }
  },
  computed: {
    nickname(){
      return this.$store.state.nickname;
    }
  },

  async created(){
    // 서버와 소켓연동
    this.socket = io('http://localhost:9000');

    // 현재 채팅방 목록 가져오기 ( + 접근권한체크)
    this.getRoomList();

    // 현재 room 전체메시지 (채팅방 입장/퇴장)
    this.socket.on("system", message => {
      this.chatData.push(`system : ${message}`)
    });

    // room이름 중복시 전달될 메시지
    this.socket.on("roomNameOverlap", name => {
      alert(`${name}은 이미 존재하는 이름입니다.`);
    });

    // 채팅전송
    this.socket.on("sendAllChating", (chat, nickname) => {
      this.chatData.push(`${nickname} : ${chat}`)
    });

    // 유저의 채팅방 삭제권한확인 (유저가 만든 room데이터만 받아옴)
    this.deleteAuthRooms = await fetchRoomDeleteAuth(this.nickname);

    // created끝나고 화면그려주기위함
    this.dataReady = true;
  }
}
</script>

<style>

.room__list, .chat__list{
  display: flex;
  flex-direction: column;
}
</style>
