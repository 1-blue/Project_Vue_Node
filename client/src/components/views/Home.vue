<template>
  <section id="home__container">
    <div v-if="message === 'loginSuccess'">
      로그인 하셨습니다.
    </div>
    <div v-else-if="message === 'logoutSuccess'">
      로그아웃 하셨습니다.
    </div>
    <h1>HOME</h1>
  </section>
</template>

<script>

export default {
  name: 'Home',
  methods: {

  },
  computed: {
    message(){
      return this.$route.query.message;
    }
  }
}
</script>

<style>

</style>
