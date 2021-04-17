export default {
    SET_LOGIN_SUCCESS(state){
        state.isLogin = true;
    },
    SET_LOGOUT(state){
        state.isLogin = false;
    },
    SET_USER_NICKNAME(state, nickname){
        state.nickname = nickname;
    },
}