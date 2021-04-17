import App from './src/App.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from "./src/store/index.js";

// 쿠키
import VueCookies from 'vue-cookies';

// jwt
import VueJwt from 'vuejs-jwt';


//Vue.prototype.$socket = socket;

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueCookies);
Vue.use(VueJwt);

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')