<template>
  <section id="login__container">
    <div v-if="message === 'UserNotFound'" class="error__message">
      비밀번호 혹은 아이디가 불일치 합니다.
    </div>

    <div v-if="message === 'ServerError'" class="error__message">
      서버측 에러입니다. 잠시후에 다시시도해주세요
    </div>

    <div v-else-if="message === 'registerSuccess'" class="success__message">
      회원가입에 성공했습니다. 로그인해주세요
    </div>

    <form action="/auth/login" method="post" class="login__form">
      <!-- 제목 -->
      <h1>로그인</h1>
      <ul class="login__list">
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
      </ul>

      <!-- 회원가입버튼 -->
      <button type="submit">
        <span>로그인</span>
      </button>
    </form>
  </section>
</template>

<script>

export default {
  name: 'Login',
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
#login__container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  --title-font-size: 3rem;
  --form-margin: 1rem;
  --form-width: 400px;
  --form-height: 40vh;
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

.success__message{
  font-size: 2.5rem;
  color: coral;
  transform: scale(0, 0);
  animation: error-message 1s forwards;
  margin-bottom: 1rem;
}

.login__form{
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

.login__form h1 {
  font-size: var(--title-font-size);
  font-weight: bold;
  margin: var(--form-margin) 0 0 0;
}

.login__list{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login__list li{
  margin-bottom: 1em;
}

.login__list input {
  border: 0;
  border-bottom: 1px solid var(--input-color);
  background: transparent;
}

.login__list input:focus {
  border-bottom: 2px solid var(--input-hover-color);
  outline: none;
}

.login__form button {
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

.login__form button::after{
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

.login__form button:hover::after{
  background: var(--button-hover-color);
  transform: scale(1, 1);
}

.login__form button:hover span{
  position: relative;
  z-index: 2;
  color: white;
}
</style>
