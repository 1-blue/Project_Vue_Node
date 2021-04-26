import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/views/Home.vue';

// 커뮤니티
import Community from '../components/views/Community.vue';
import PostAppend from '../components/views/PostAppend.vue';
import Post from '../components/views/Post.vue';

// 채팅
import Chatting from '../components/views/Chatting.vue';

// 웹게임
import WebGame from '../components/views/WebGame.vue';

import Login from '../components/views/Login.vue';
import Register from '../components/views/Register.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/home', component: Home },               // 메인페이지
  { path: '/community', component: Community },     // 커뮤니티페이지
  { path: '/community/:id', component: Post },      // 커뮤니티 - 게시글페이지
  { path: '/postAppend', component: PostAppend },   // 커뮤니티 - 게시글업로드페이지
  { path: '/chatting', component: Chatting },       // 채팅페이지
  { path: '/webGame', component: WebGame },         // 웹게임페이지
  { path: '/login', component: Login },             // 로그인페이지
  { path: '/register', component: Register },       // 회원가입페이지
]

// vue-router인스턴스에 routes정의
export default new VueRouter({
  //mode: 'history',
  routes,
})