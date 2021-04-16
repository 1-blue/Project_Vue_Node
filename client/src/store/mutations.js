export default {
    SET_LOGIN_SUCCESS(state){
        state.isLogin = true;
    },
    SET_LOGOUT(state){
        state.isLogin = false;
    },
}