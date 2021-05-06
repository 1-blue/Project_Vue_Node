import Vue from 'vue';
import VueRouter from 'vue-router';

// 웹게임
import MineSweeper from '../components/views/games/MineSweeper.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/webGame/mineSweeper', component: MineSweeper }, // 웹게임 - 지뢰찾기
]

// vue-router인스턴스에 routes정의
export default new VueRouter({
  //mode: 'history',
  routes,
})