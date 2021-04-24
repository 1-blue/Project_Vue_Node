<template>
  <section id="comment__container">
    <!-- 정상적인 유저 or 로그인했는지 체크 -->
    <div v-if="commentList">
      <!-- 댓글 업로드 권한없을경우 및 서버에러일경우 -->
      <div v-if="state">
        <div v-if="state === 'userFindError'">
          로그인후에 시도해주세요
        </div>
        <div v-if="state === 'commentAppendError'">
          댓글 업로드 에러입니다. 잠시후에 다시시도해주세요
        </div>
      </div>

      <!-- 댓글업로드창 -->
      <form action="/community/comment" method="post" class="comment__upload__form">
        <input type="hidden" :value="nickname" name="nickname" />
        <input type="hidden" :value="postId" name="postId" />
        <div class="comment__input_area">
          <input type="text" name="comment" class="comment__input"/>
          <span class="comment__input__effect"/>
        </div>
        <button type="submit" class="comment__button">댓글</button>
      </form>

      <!-- 댓글리스트보여주지 -->
      <ul class="comment__list">
        <li v-for="comment in commentList" :key="comment.id" class="comment" >
          <!-- 사용자명 -->
          <span class="user__name">
            <i class="fas fa-user"></i>
            {{ comment.User.nickname }}
          </span>

          <!-- 댓글내용 -->
          <span class="content">
            {{ comment.comment }}
          </span>

          <!-- 등록시간 -->
          <span class="updated__time">
            <i class="far fa-clock"></i>
            {{ comment.dateFormat }}
          </span>

          <span class="horizontal__line" />
        </li>
      </ul>
    </div>

    <div v-else>
      접근권한이 없습니다. 로그인후에 접근해주세요 ( 댓글기록다운에러 ))
    </div>
  </section>
</template>

<script>
import { fetchComment } from '../../api/fetch.js';

export default {
  name: 'Comment',
  data(){
    return{
      commentList: null,
    }
  },
  methods: {

  },
  computed: {
    postId(){
      return this.$route.params.id;
    },
    nickname(){
      return this.$store.state.nickname;
    },
    state(){
      return this.$route.query;
    }
  },
  async created(){
    this.commentList = await fetchComment(this.postId);

    if(this.commentList.message){
      this.commentList = false;
    }
  }
}
</script>

<style scoped>
#comment__container{
  width: 100%;
}

.comment__upload__form{
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

.comment__input_area{
  position: relative;
}

.comment__input{
  border: oldlace;
  background: transparent;
  border-bottom: 1px solid gray;
  width: 100%;
  outline: none;
}

.comment__input__effect{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0px;
  height: 2px;
  transition: all 0.5s;
  background: blue;
}

.comment__input:focus + .comment__input__effect{
  width: 100%;
}

.comment__button{
  align-self: flex-end;
  margin: 0.5em 0 0.5em 0.5em;
}

.comment__list{
  display: flex;
  flex-direction: column;
}

.comment{
  display: flex;
  flex-direction: column;
}

.user__name, .content, .updated__time{
  margin: 0.1em 0;
}

.user__name{
  font-size: 0.8em;
  font-weight: bold;
}

.updated__time{
  font-size: 0.5em;
  color: gray;
}

.horizontal__line{
  width: 100%;
  border-bottom: 2px solid lightgray;
  margin: 1em 0;
}

</style>