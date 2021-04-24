<template>
  <section id="post__container" v-if="dataReady">
    <!-- 정상적으로 데이터 받았을 경우 (로그인했을경우) -->
    <ul class="post__list" v-if="postData">
      <!-- exit버튼 -->
      <i class="fas fa-sign-out-alt post__exit__icon" @click="exit"></i>

      <!-- title -->
      <li class="post__title">
        <span>{{ postData.title }}</span>
      </li>

      <span class="horizontal__line" />

      <!-- content -->
      <li class="post__content">
        <span>{{ postData.content }}</span>
      </li>

      <!-- 부가정보 -->
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

      <span class="horizontal__line" />

      <!-- 댓글기능 -->
      <comment />
    </ul>

    <!-- 데이터전송못받았을경우 (로그인안하고 접근할경우) -->
    <div v-else>
      접근권한이 없습니다. 로그인후에 접근해주세요
    </div>
  </section>
</template>

<script>
import Comment from './Comment.vue';
import { fetchPost } from '../../api/fetch.js';

export default {
  name: 'post',
  components: {
    Comment,
  },
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
    this.postData = await fetchPost(this.$route.params.id);
      
    if(this.postData.message){
      this.postData = false;
    }

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

.horizontal__line{
  width: 100%;
  border-bottom: 2px solid;
  margin: 1em 0;
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
  min-height: 20vh;
}

.post__title{
  font-size: var(--title-font-size);
  font-weight: bold;
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