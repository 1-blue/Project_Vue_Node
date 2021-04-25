<template>
  <section id="register__container">
    <div v-if="message === 'idOverlap'" class="error__message">
      아이디중복
    </div>
    <div v-else-if="message === 'nicknameOverlap'" class="error__message">
      닉네임중복
    </div>
    <div v-else-if="message === 'passwordCheck'" class="error__message">
      패스워드불일치
    </div>
    <div v-else-if="message === 'createUserError'" class="error__message">
      유저생성오류 잠시후 다시시도해주세요
    </div>

    <form action="/auth/register" method="post" class="register__form">
      <!-- 제목 -->
      <h1>회원가입</h1>
      <ul class="register__list">
        <!-- 닉네임 -->
        <li>
          <label for="nickname">닉네임</label>
          <input type="text" name="nickname" placeholder="nickname" maxlength="20" required />
        </li>

        <!-- 아이디 -->
        <li>
          <label for="id">아이디</label>
          <input type="text" name="identify" placeholder="id" maxlength="20" required />
        </li>

        <!-- 비밀번호 -->
        <li>
          <label for="password">비밀번호</label>
          <input type="text" name="password" placeholder="password" maxlength="20" required />
        </li>

        <!-- 비밀번호확인 -->
        <li>
          <label for="passwordCheck">비번검사</label>
          <input type="text" name="passwordCheck" placeholder="passwordCheck" maxlength="20" required />
        </li>
      </ul>

      <!-- 회원가입버튼 -->
      <button type="submit">
        <span>가입</span>
      </button>
    </form>
  </section>
</template>

<script>

export default {
  name: 'Register',
  methods: {

  },
  computed: {
    message(){
      return this.$route.query.message;
    }
  }
}
</script>

<style scoped>
#register__container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  --title-font-size: 3rem;
  --form-margin: 1rem;
  --form-width: 400px;
  --form-height: 50vh;
  --form-background-color: wheat;
  --input-color: lightskyblue;
  --input-hover-color: blue;
  --button-font-size: 1.5rem;
  --button-hover-color: violet;
}

@keyframes error-message{
  80%{
    transform: scale(1.0, 1.0);
  }
  to{
    transform: scale(0.8, 0.8);
  }
}

.error__message{
  font-size: 2.5rem;
  color: red;
  transform: scale(0, 0);
  animation: error-message 1s forwards;
  margin-bottom: 1rem;
}

.register__form{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: var(--form-width);
  height: var(--form-height);
  background: var(--form-background-color);
  border: 3px solid black;
  border-radius: 1rem;
}

.register__form h1 {
  font-size: var(--title-font-size);
  font-weight: bold;
  margin: var(--form-margin) 0 0 0;
}

.register__list{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.register__list li{
  margin-bottom: 1em;
}

.register__list input {
  border: 0;
  border-bottom: 1px solid var(--input-color);
  background: transparent;
}

.register__list input:focus {
  border-bottom: 2px solid var(--input-hover-color);
  outline: none;
}

.register__form button {
  position: relative;
  width: 100px;
  height: 50px;
  font-size: var(--button-font-size);
  font-weight: bold;
  margin-bottom: var(--form-margin);
  border: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.5s;
}

.register__form button::after{
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 100%;
  height: 100%;
  background: white;
  transform: scale(0, 1);
  transition: all 0.5s;
  z-index: 1;
}

.register__form button:hover::after{
  background: var(--button-hover-color);
  transform: scale(1, 1);
}

.register__form button:hover span{
  position: relative;
  z-index: 2;
  color: white;
}
</style>
