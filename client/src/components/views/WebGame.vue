<template>
  <section id="web__game__container">
    <ul>
      <li>
        <router-link to="/webGame/mineSweeper">지뢰찾기</router-link>
      </li>
      <li>블럭맞추기</li>
      <li>테트리스</li>
    </ul>

    <router-view></router-view>
  </section>
</template>

<script>
import router from '../../routes/webGame.js';

export default {
  name: 'WebGame',
  router,
}
</script>

<style scoped>


a{
  color: red;
}
</style>>