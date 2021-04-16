import App from './src/App.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from "./src/store/index.js";
import VueCookies from 'vue-cookies';
import VueJwt from 'vuejs-jwt';

// 소켓관련
//import io from 'socket.io-client';
//const socket = io('http://localhost:9000');
//Vue.prototype.$socket = socket;

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueCookies);
Vue.use(VueJwt);

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')