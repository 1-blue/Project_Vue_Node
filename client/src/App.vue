<template>
  <section id="app__container">
    <navigation-bar></navigation-bar>
  </section>
</template>

<script>
import router from './routes';
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  router,
  components: {
    NavigationBar
  },
  data(){
    return{
      issur: "1-blue",
    }
  },
  methods: {

  },
  computed: {
    isLoginCookie(){
      return this.$cookies.isKey('login_access_token');
    },
    loginCookie(){
      return this.$cookies.get('login_access_token');
    },
    jwtDecoded(){
      return this.$jwt.decode(this.loginCookie);
    }
  },
  created(){
    // 로그아웃상태
    if(!this.isLoginCookie){
      return this.$store.dispatch("LOGOUT");
    }

    const { iss, nickname } = this.jwtDecoded;

    // 로그인상태
    if(iss === this.issur){
      this.$store.dispatch("LOGIN_SUCCESS");
      this.$store.dispatch("USER_NICKNAME", nickname);
    }
  }
}
</script>

<style>
#app__container{
  height: 100vh;
}

body, ul, li{
  padding: 0px;
  margin: 0px;
}
body{
  background: white;
}
li{
  list-style: none;
  display: inline-block;
}
a{
  text-decoration: none;
  color: white;
}
input{
  padding: 0;
}
.shadow{
  box-shadow: 10px 5px 5px gray;
}

.active{
  display: flex;
}

.unactive{
  display: none;
}
</style>
