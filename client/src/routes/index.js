import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/views/Home.vue';
import Community from '../components/views/Community.vue';
import Chatting from '../components/views/Chatting.vue';
import Login from '../components/views/Login.vue';
import Register from '../components/views/Register.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/home', component: Home },
  { path: '/community', component: Community },
  { path: '/chatting', component: Chatting },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
]

// vue-router인스턴스에 routes정의
export default new VueRouter({
  //mode: 'history',
  routes,
})