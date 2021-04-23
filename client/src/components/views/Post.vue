<template>
  <section id="post__container" v-if="dataReady">
    <ul class="post__list">
      <i class="fas fa-sign-out-alt post__exit__icon" @click="exit"></i>
      <li class="post__title">
        <span>{{ postData.title }}</span>
      </li>
      <li class="post__content">
        <span>{{ postData.content }}</span>
      </li>
      <li class="post__info">
        <span class="post__info__user">
          <i class="fas fa-user"></i>
          {{ postData.User.nickname }}
        </span>
        <span class="post__info__clock">
          <i class="far fa-clock"></i>
          {{ postData.dateFormat }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
import { fetchPost } from '../../api/fetch.js';

export default {
  name: 'post',
  data(){
    return{
      dataReady: false,
      postData: {},
    }
  },
  methods: {
    exit(){
      this.$router.go(-1);
    }
  },
  computed: {

  },

  async created(){
    const data = await fetchPost(this.$route.params.id);
    this.postData = data;

    this.dataReady = true;
  }
}
</script>

<style scoped>
#post__container{
  display: flex;
  justify-content: center;

  --post-width: 500px;
  --post-height: 70vh;
  --post-background-color: rgb(255 252 77 / 70%);
  --post-shadow: 0 0 1rem black;
  --post-padding: 1rem;
  --exit-icon-size: 3rem;
  --title-font-size: 2rem;
  --user-icon-size: 0.8em;
  --clock-icon-size: 0.5em;
}

.post__list{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--post-width);
  min-height: var(--post-height);
  background: var(--post-background-color);
  box-shadow: var( --post-shadow);
  padding: var(--post-padding);
}

.post__exit__icon{
  position: absolute;
  top: 15px;
  left: 20px;
  font-size: var(--exit-icon-size);
  cursor: pointer;
}

.post__content{
  flex-grow: 1;
}

.post__title{
  font-size: var(--title-font-size);
  font-weight: bold;
  margin-bottom: 0.5em;
}

.post__info{
  align-self: flex-end;
  display: flex;
  flex-direction: column;
}

.post__info__user{
  font-size: var(--user-icon-size);
}

.post__info__clock{
  font-size: var(--clock-icon-size);
}

</style>>