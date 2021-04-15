import App from './src/App.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
}).$mount('#app')