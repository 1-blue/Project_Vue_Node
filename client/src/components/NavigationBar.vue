<template>
  <section id="navigation__bar__container">
    <ul class="link__list">
      <!-- 메인로고 -->
      <li class="logo__link">
        <router-link to="/home">HOME</router-link>
      </li>

      <!-- 각종 기능들 페이지 -->
      <li class="function__link">
        <router-link to="/community">COMMUNITY</router-link>
        <router-link to="/chatting">CHATTING</router-link>
        <router-link to="/webGame">WebGame</router-link>
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

      <li id="burger__link">
        <i class="fas fa-bars burger__icon"></i>
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
  },
  mounted(){
    // 768px이하일때 햄버그메뉴활성화
    const hamburgerMenu = document.querySelector("#burger__link");
    const navList = document.querySelector(".link__list");
    const navArray = Array.prototype.slice.call(navList.childNodes);    // nodeList를 Array로 변환

    hamburgerMenu.addEventListener('click', () => {
      navArray.forEach(v => {
        // 클래스면 보이게만들기
        if(v.className){
          v.classList.toggle('active');

          //링크클릭하면 햄버그메뉴닫기
          v.addEventListener('click', () => {
            navArray.forEach(vv => {
              if(vv.className){
                vv.classList.remove("active");
              }
            })
          });
        }
      });
    });
  }
}
</script>

<style scoped>
#navigation__bar__container{
  --navigation-height: 10vh;
  --navigation-margin-bottom: 2em;
  --navigation-background-color: rgb(37, 37, 37);
  --link-interval: 2.5vw;
  --link-font-size: 1.5rem;
  --link-color: rgb(221, 221, 221);
  --link-hover-color: #F7B70F;
  --link-hover-back-color: coral;


  height: inherit;
}

.link__list{
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: var(--navigation-height);
  background: var(--navigation-background-color);
  margin-bottom: var(--navigation-margin-bottom);
}
/* navigation의 li상하 가운데정렬 */
.logo__link, .function__link, .auth__link, .burger__link{
  display: flex;
  justify-content: center;
  align-items: center;
}
.link__list span{
  color: var(--link-color);
}
/* li태그 끼리 간격조절 */
.link__list a, .link__list span {
  margin: 0 var(--link-interval);
  font-size: var(--link-font-size);
  font-weight: bold;
}
/* li태그 hover */                                    /* 현재 선택한 페이지 표시 */
.link__list a:hover, .link__list span:hover, .router-link-exact-active {
  color: var(--link-hover-color);
  border-bottom: 7px solid var(--link-hover-color);
  padding-top: 2.8vh;
  padding-bottom: 1.8vh;
}

#burger__link{
  display: none;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  font-size: 2rem;
  color: var(--link-color);
  cursor: pointer;
}

@media screen and (max-width: 768px)  {
  .link__list a{
    padding: 0.5em 20%;
    margin: 0.2em 0;
  }

  .link__list a:hover, .link__list span:hover {
    color: var(--link-color);
    background: var(--link-hover-back-color);
    border-bottom: 0;
    padding: 0.5em 20%;
    border-radius: 1em;
  }

  .router-link-exact-active{
    color: var(--link-hover-color);
    border-bottom: 0;
    padding: 0.5em 20%;
  }

  .link__list{
    flex-direction: column;
    height: auto;
  }

  .logo__link,
  .function__link,
  .auth__link,
  .burger__link{
    display: none;
  }

  .function__link,
  .auth__link,
  .burger__link{
    flex-direction: column;
  }

  .logo__link{
    display: flex;
  }

  #burger__link{
    display: inline-block;
  }


  .active{
    display: flex;
  }
}
</style>
