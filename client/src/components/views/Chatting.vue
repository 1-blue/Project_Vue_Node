<template>
  <section id="Chatting__container" v-if="dataReady">
    <div v-if="isDeleteSuccess" class="message">
      채팅방 삭제완료
    </div>

    <ul v-if="rooms && !isJoinRoom" class="title__room__list">
      <li class="title__bar">
        <h1 class="chatting__title">채팅</h1>
        <div>
          <i class="fas fa-search room__search__icon"></i>
          <i class="fas fa-comment-medical room__create__icon"></i>
        </div>
      </li>

      <li class="room__create__section">
        <input type="text" v-model="roomName" class="room__create__input"/>
        <button @click.prevent="createdRoom" class="room__create__button" :class="{ button__active: roomButtonIsActive }" :disabled="!roomButtonIsActive">생성</button>
      </li>

      <li class="rooms">
        <ul v-if="!isJoinRoom" class="room__list">
          <li v-for="room in rooms" :key="room.id" class="room" @dblclick="joinRoom(room.name)">
            <h6 class="room__title">{{ room.name }}</h6>
            <div class="room__btns">
              <button @click.prevent="deleteRoom(room.name)" v-if="xxx(room.name)">삭제</button>
              <button @click.prevent="joinRoom(room.name)">입장</button>
            </div>
          </li>
        </ul>
      </li>
    </ul>

    <ul v-else-if="isJoinRoom" class="chat__list">
      <button @click.prevent="leaveRoom" class="chatting__exit__btn"><i class="fas fa-sign-out-alt"></i></button>
      <h6>{{ JoinRoomName }}</h6>
      <div class="chatting__area">
        <!-- 내 채팅이면 우측에서출력 -->
        <li v-for="(chat__, index) in chatData" :key="index" :class="{ flex__end: isMyChatting(chat__.name), flex__center: isSystemChatting(chat__.name) }">
          <!-- 내 채팅 or system 이름출력 X -->
          <span class="chat__name" v-if="!(isMyChatting(chat__.name)) && !(isSystemChatting(chat__.name))">{{ chat__.name }}</span>
          <span class="chat__content">{{ chat__.content }}</span>
        </li>
      </div>

      <!-- 채팅전송 기능 -->
      <div class="chatting__function__area">
        <input type="text" v-model="chat" class="chatting__input" />
        <button @click.prevent="sendMyChatting" class="chatting__send__btn" :class="{ button__active: chattingButtonIsActive }" :disabled="!chattingButtonIsActive">전송</button>
      </div>
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
      JoinRoomName: "",   // 참가한 방이름
      chat: "",           // 현재채팅 v-model
      chatData: [],       // 채팅데이터들 넣어들 변수
      deleteAuthRooms: [],// 삭제권한있는 room들
      isDeleteSuccess: false,   //채팅방삭제완료인지 체크
      isAddEvent: false,    // mounted에 icon이 생성안된다고 에러떠가지고 사용
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
      // 임시적으로 setTimeout사용해서 0.1초뒤에 데이터받아옴

      setTimeout(async () => {
        // 현재 room정보 가져옴
        this.getRoomList();

        // 유저의 채팅방 삭제권한확인 (유저가 만든 room데이터만 받아옴)
        this.deleteAuthRooms = await fetchRoomDeleteAuth(this.nickname);

        // 입력받은 room이름 비워주기
        this.roomName = "";
      }, 100);
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
      this.JoinRoomName = name;

      // 기존 채팅기록 불러와서 chatData에 넣기
      const data = await fetchChatting(name);

      data.forEach(v => this.chatData.push({ name: v.User.nickname, content: v.content }));
      
      // 엔터키누르면 채팅전송이벤트등록
      const chattingInput = document.querySelector(".chatting__input");
      chattingInput.addEventListener("keypress", e => {
        if(e.key === "Enter" && this.roomButtonIsActive){
          this.sendMyChatting();
        }
      });
    },
    async leaveRoom(){
      await this.socket.emit("leaveRoom");
      this.isJoinRoom = false;

      // 채팅기록 삭제처리
      this.chatData.length = 0;

      // 임시추가 (mounted에 icon못찾아가지고)
      this.isAddEvent = false;
    },
    async sendMyChatting(){
      await this.socket.emit("sendMyChatting", this.chat);

      // 인풋창 채팅 비워주기
      this.chat = "";
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
    },
    isMyChatting(nickname){
      return this.nickname === nickname;
    },
    isSystemChatting(nickname){
      return "system" === nickname;
    }
  },
  computed: {
    nickname(){
      return this.$store.state.nickname;
    },
    roomButtonIsActive(){
      return (this.roomName.length !== 0) ? true : false;
    },
    chattingButtonIsActive(){
      return (this.chat.length !== 0) ? true : false;
    }
  },

  async created(){
    // 서버와 소켓연동
    this.socket = io('http://localhost:9000');

    // 현재 채팅방 목록 가져오기 ( + 접근권한체크)
    this.getRoomList();

    // 현재 room 전체메시지 (채팅방 입장/퇴장)
    this.socket.on("system", message => {
      this.chatData.push({ name: "system", content: message });
    });

    // room이름 중복시 전달될 메시지
    this.socket.on("roomNameOverlap", name => {
      alert(`${name}은 이미 존재하는 이름입니다.`);
    });

    // 채팅전송
    this.socket.on("sendAllChating", (chat, nickname) => {
      this.chatData.push({ name: nickname, content: chat });
    });

    // 유저의 채팅방 삭제권한확인 (유저가 만든 room데이터만 받아옴)
    this.deleteAuthRooms = await fetchRoomDeleteAuth(this.nickname);

    // created끝나고 화면그려주기위함
    this.dataReady = true;
  },
  updated(){
    if(this.isAddEvent){
      return;
    }
    const roomCreateIcon = document.querySelector(".room__create__icon");
    const createSection = document.querySelector(".room__create__section");

    // room생성 아이콘클릭시 input박스 보이도록
    roomCreateIcon.addEventListener('click', () => {
      createSection.classList.toggle("active");
    });

    // 채팅방생성 엔터기능
    const roomCreateInput = document.querySelector(".room__create__input");
    roomCreateInput.addEventListener("keypress", e => {
      if(e.key === "Enter" && this.roomButtonIsActive){
        this.createdRoom();
      }
    });

    this.isAddEvent = true;
  }
}
</script>

<style>
#Chatting__container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  --room-background-color: rgb(156, 186, 216);
  --signature-color: rgb(255, 236, 66);
  --room-title-background-color: #5D8BF7;
}

@keyframes message{
  70%{
    transform: scale(1, 1);
  }
  to{
    transform: scale(0.8, 0.8);
  }
}

.message{
  font-size: 3rem;
  font-weight: bold;
  color: blue;
  transform: scale(0, 0);
  animation: message 1s forwards;
  margin-bottom: 2rem;
}

.title__room__list{
  background: white;
  box-shadow: 0 0 1rem black;
  width: 450px;
  height: 75vh;
  overflow: auto;
  border-radius: 0.2rem;
  padding: 1rem;
}

.title__bar{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatting__title{
  font-size: 2rem;
  margin: 1rem 0;
}

.room__create__icon, .room__search__icon{
  font-size: 2rem;
  cursor: pointer;
  margin-right: 0.5em;
}

.room__create__icon:hover, .room__search__icon:hover{
  color: var(--signature-color);
}

.room__create__section{
  display: none;
  justify-content: center;
  margin-bottom: 1em;
}

.room__create__section > input {
  border-radius: 1em;
  width: 60%;
  margin-right: 1em;
  outline: none;
  font-size: 1em;
  padding-left: 1em;
}

.room__create__button {
  height: 2.5em;
  outline: none;
  background: lightgray;
  border: 1px solid lightgray;
  border-radius: 0.2em;
  color: black;
  cursor: not-allowed;
}

.room__list, .chat__list{
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 1rem black;
  border-radius: 0.5em;
}

.rooms{
  width: 100%;
}

.room{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 0.1px solid;
  background-color: yellow;
}

.room:hover{
  background: lightgray;
}

.room__title{
  margin: 0;
  font-size: 1.2em;
  margin-left: 1em;
}

.room__btns{
  margin-right: 1em;
}

.room__btns button{
  border: 0;
  background: transparent;
  outline: none;
  font-weight: bold;
  cursor: pointer;
}

.room__btns button:hover{
  color: lightskyblue;
}

/* 채팅방관련 css */
.chat__list{
  position: relative;
  overflow: hidden;
}

.chatting__exit__btn{
    position: absolute;
    top: 20px;
    left: 12px;
    background: transparent;
    border: 0;
    cursor: pointer;
    font-size: 2em;
}

.chat__list > h6{
  display: flex;
  justify-content: center;
  font-size: 2em;
  font-weight: bold;
  margin: 0;
  padding: 0.5em 0;
  background: #5D8BF7;
}

.chatting__area{
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 50vh;
  background: var(--room-background-color);
  overflow: auto;
}

.chatting__area > li {
  margin: 0.5em 0;
}

.chat__content{
  display: inline-flex;
  background: white;
  border-radius: 0.2em;
  padding: 0.5em;
  margin: 0 0.5em;
}

.chatting__function__area{
  position: relative;
}

.chatting__input{
  outline: none;
  width: 80%;
  margin: 0px;
  border: 0px;
  padding: 10px;  
}

.chatting__send__btn{
  position: absolute;
  top: 4px;
  right: 5px;
  background: var(--signature-color);
  border: 0.2px solid lightgray;
  border-radius: 0.2em;
  height: 30px;
  cursor: not-allowed;
}

.flex__end{
  align-self: flex-end;
}
.flex__center{
  align-self: center;
}

.button__active{
  background: var(--signature-color);
  cursor: pointer;
}

</style>