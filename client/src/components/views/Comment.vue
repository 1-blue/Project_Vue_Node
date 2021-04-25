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
        <div v-if="state === 'recommentAppendError'">
          대댓글 업로드 에러입니다. 잠시후에 다시시도해주세요
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
        <li v-for="comment in commentList" :key="comment.id">
          <!-- 댓글영역 -->
          <div v-if="!comment.commentId" class="comment">
            <!-- 사용자명 -->
            <span class="user__profile">
              <span class="user__name">
                <i class="fas fa-user"></i>
                {{ comment.User.nickname }}
              </span>
              <span class="recomment__toggle" @click="commentToggle(comment.id)">답글</span>
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

            <!-- 대댓글등록 -->
            <form action="/community/recomment" method="post" class="recomment__form" :data-value="comment.id">
              <input type="hidden" name="nickname" :value="nickname" />
              <input type="hidden" name="postId" :value="postId" />
              <input type="hidden" name="commentId" :value="comment.id" />
              <input type="text" name="comment" />
              <button type="submit">대댓글</button>
            </form>

            <span class="horizontal__line" />
          </div>
          
          <!-- 대댓글영역 -->
          <div v-else class="recomment">
            <!-- 사용자명 -->
            <span class="user__profile">
              <span class="user__name">
                <i class="fas fa-user"></i>
                {{ comment.User.nickname }}
              </span>
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
          </div>
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
    commentToggle(commentId){
      const recommentForm = document.querySelectorAll(".recomment__form");

      // 대댓글 form 토글설정
      recommentForm.forEach(v => {
        if(commentId === Number(v.dataset.value)){
          v.classList.toggle("active");
          return;
        }
      });
    }
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
    const temp = await fetchComment(this.postId);

    if(temp.message){
      this.commentList = false;
      return;
    }

    // 댓글과 대댓글 정렬을 위해 배열에다 넣고 정렬
    const tempArray = [];
    for(const item of temp){
      tempArray.push(item);
    }

    const recommentSortVar = {};

    tempArray.forEach((v, i) => {
      // 대댓글이면
      if(v.commentId){
        tempArray.forEach((value, index) => {
          
          if(v.commentId === value.id){
            // 대댓글 역순정렬
            if(!recommentSortVar[`${v.commentId}`]){
              recommentSortVar[`${v.commentId}`] = 1;
            } else {
              recommentSortVar[`${v.commentId}`]++;
            }

            // 댓글의 위치 바로 밑으로 이동
            let temp2 = tempArray.splice(i, 1);
            tempArray.splice(index + recommentSortVar[`${v.commentId}`], 0, temp2[0]);
          }
        });
      }
    });
    this.commentList = tempArray;
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

.user__profile, .content, .updated__time{
  margin: 0.1em 0;
}

.user__profile{
  display: flex;
  justify-content: space-between;
}

.user__name{
  font-size: 0.8em;
  font-weight: bold;
}

.recomment__toggle{
  cursor: pointer;
}

.updated__time{
  font-size: 0.5em;
  color: gray;
}

.recomment__form{
  display: none;
}

.horizontal__line{
  width: 100%;
  border-bottom: 2px solid lightgray;
  margin: 1em 0;
}

.recomment{
  display: flex;
  flex-direction: column;
  margin-left: 2em;
}

.active{
  display: flex;
}

</style>