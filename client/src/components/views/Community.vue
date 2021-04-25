<template>
  <section id="community__container">
    <div v-if="state">
      <h1 v-if="state === 'postAppendError'">게시글업로드에러입니다. 잠시후에다시시도해주세요</h1>
    </div>
    <template v-if="posts">
      <router-link class="post__append__link" to="/postAppend" v-if="isLogin">
        게시글올리기
      </router-link>
      <ul class="community__list">
        <li class="community__item" v-for="(post, index) in posts" :key="index" >
          <router-link :to="`/community/${post.id}`">{{ post.title }}</router-link>
          <div class="community__add__info">
            <router-link :to="`/community/${post.User.id}`">{{ post.User.nickname }}</router-link>
            <span>{{ post.dateFormat }}</span>
          </div>
        </li>
      </ul>
    </template>

    <div v-else>
      접근권한이 없습니다. 로그인후에 접근해주세요
    </div>
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
  computed: {
    isLogin(){
      return this.$store.state.isLogin;
    },
    state(){
      return this.$route.query.state;
    }
  },
  async created(){
    this.posts = await fetchCommunity();

    if(this.posts.message){
      this.posts = false;
    }
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
  min-height: 70vh;
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
