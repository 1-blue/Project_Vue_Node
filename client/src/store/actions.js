export default{
  LOGIN_SUCCESS(context){
    context.commit("SET_LOGIN_SUCCESS");
  },
  LOGOUT(context){
    context.commit("SET_LOGOUT");
  }
}