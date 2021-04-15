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
      <li class="auth__link">
        <router-link to="/login">LOGIN</router-link>
        <router-link to="/register">REGISTER</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </section>
</template>

<script>

export default {
  name: 'NavigationBar',
}
</script>

<style>
#navigation__bar__container{
  --navigation-height: 10vh;
  --navigation-background-color: black;
  --link-interval: 2.5vw;
  --link-font-size: 1.5rem;
}

.link__list{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: var(--navigation-height);
  background: var(--navigation-background-color);
}
/* navigation의 li상하 가운데정렬 */
.link__list li{
  display: flex;
  justify-content: center;
  align-items: center;
}
/* li태그 끼리 간격조절 */
.link__list a {
  margin: 0 var(--link-interval);
  font-size: var(--link-font-size);
  font-weight: bold;
}
/* li태그 hover */                                    /* 현재 선택한 페이지 표시 */
.link__list a:hover, .router-link-exact-active {
  color: wheat;
  border-bottom: 7px solid wheat;
  padding-top: 3vh;
  padding-bottom: 1vh;
}
</style>
