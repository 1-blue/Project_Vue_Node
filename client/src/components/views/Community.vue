<template>
  <section id="community__container">
    <router-link class="post__append__link" to="/postAppend">
      게시글올리기
    </router-link>
    <ul class="community__list">
      <li class="community__item" v-for="(post, index) in posts" :key="index" >
        <span>{{ post.title }}</span>
        <div class="community__add__info">
          <span>{{ post.User.nickname }}</span>
          <span>{{ post.dateFormat }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { fetchCommunity } from '../../api/fetch.js';

export default {
  name: 'Community',
  data(){
    return{
      posts: {},
    }
  },
  methods: {

  },
  async created(){
    const data = await fetchCommunity();
    this.posts = data;
  }
}
</script>

<style scoped>
#community__container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post__append__link{
  align-self: flex-end;
  color: blue;
}

.community__list{
  width: 80%;
  height: 70vh;
  background: lightgray;
  border: 3px solid black;
  padding: 1em;
}

.community__item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em 0;
  border-bottom: 1px solid black;
}

.community__add__info{
  display: flex;
  flex-direction: column;
}
</style>
