<template>
  <section id="post__append__container">
    <form action="/community/append" method="post" class="post__form">
      <input type="text" name="title">

      <textarea name="content" cols="30" rows="10"></textarea>

      <button type="submit">전송</button>
    </form>
  </section>
</template>

<script>

export default {
  name: 'postAppend',
}
</script>

<style scoped>


.post__form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>>