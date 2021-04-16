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
      return this.$jwt.decode(this.loginCookie).iss;
    }
  },
  created(){
    // 로그아웃상태
    if(!this.isLoginCookie){
      return this.$store.dispatch("LOGOUT");
    }

    // 로그인상태
    if(this.jwtDecoded === this.issur){
      this.$store.dispatch("LOGIN_SUCCESS");
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
.shadow{
  box-shadow: 10px 5px 5px gray;
}
</style>
