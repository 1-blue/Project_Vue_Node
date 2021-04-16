<template>
  <section id="navigation__bar__container">
    <ul class="link__list">
      <!-- 메인로고 -->
      <li class="logo__link">
        <router-link to="/home">HOME</router-link>
      </li>

      <!-- 각종 기능들 페이지 -->
      <li>
        <router-link to="/community">COMMUNITY</router-link>
        <router-link to="/chatting">CHATTING</router-link>
      </li>

      <!-- 인증페이지 -->
      <!-- 로그인안했을경우 -->
      <li class="auth__link" v-if="!isLogin">
        <router-link to="/login">LOGIN</router-link>
        <router-link to="/register">REGISTER</router-link>
      </li>
      <!-- 로그인 했을경우 -->
      <li class="auth__link" v-else>
        <span @click="logout">LOGOUT</span>
        <router-link to="/user">MYINFO</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </section>
</template>

<script>
import { fetchLogout } from '../api/fetch.js';

export default {
  name: 'NavigationBar',
  methods: {
    async logout(){
      const message = await fetchLogout();
      if(message === "logoutSeccess"){
        this.$router.push('/home?message=logoutSuccess');
        location.reload()
      }
    }
  },
  computed: {
    isLogin(){
      return this.$store.state.isLogin;
    }
  }
}
</script>

<style>
#navigation__bar__container{
  --navigation-height: 10vh;
  --navigation-margin-bottom: 2em;
  --navigation-background-color: black;
  --link-interval: 2.5vw;
  --link-font-size: 1.5rem;

  height: inherit;
}

.link__list{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: var(--navigation-height);
  background: var(--navigation-background-color);
  margin-bottom: var(--navigation-margin-bottom);
}
/* navigation의 li상하 가운데정렬 */
.link__list li{
  display: flex;
  justify-content: center;
  align-items: center;
}
.link__list span{
  color: white;
}
/* li태그 끼리 간격조절 */
.link__list a, .link__list span {
  margin: 0 var(--link-interval);
  font-size: var(--link-font-size);
  font-weight: bold;
}
/* li태그 hover */                                    /* 현재 선택한 페이지 표시 */
.link__list a:hover, .link__list span:hover, .router-link-exact-active {
  color: wheat;
  border-bottom: 7px solid wheat;
  padding-top: 3vh;
  padding-bottom: 1vh;
}
</style>
