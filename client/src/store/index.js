import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isLogin: false,			// 로그인상태일때
        nickname: "",           // 로그인한 유저의 닉네임
    },
    mutations,
    actions,
});