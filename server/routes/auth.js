const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { idOverlapCheck, nicknameOverlapCheck, isLoggedIn, isNotLoggedIn } = require('../middleware');

// 회원가입
router.post('/register', idOverlapCheck, nicknameOverlapCheck, isNotLoggedIn, async (req, res) => {
  const { nickname, identify, password, passwordCheck } = req.body;

  if(password !== passwordCheck){
    return res.redirect(`/#/register?message=passwordCheck`)
  }

  const hashPassword = await bcrypt.hash(password, 6);
  try {
    await User.create({
      nickname,
      identify,
      password: hashPassword,
    });
  } catch (error) {
    return res.redirect(`/#/register?message=createUserError`)
  }

  return res.redirect(`/#/login?message=registerSuccess`)
});

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user) => {
    // 서버측에러
    if(authError){
      return res.redirect(`/#/login?message=ServerError`);
    }

    // 일치유저존재하지않음 즉 아이디나 패스워드틀림
    if(!user){
      return res.redirect(`/#/login?message=UserNotFound`);
    }

    // 로그인성공
    // req.login호출하면 req.user에 로그인한 user값이 저장됨
    return req.login(user, (loginError) => {
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      const token = jwt.sign(
        {
            nickname: user.nickname
        },
        process.env.JWT_KEY,
        {
            algorithm : "HS256", // 해싱 알고리즘
            expiresIn : "60m",  // 토큰 유효 기간
            issuer : "1-blue" // 발행자
        }
      )
      res.cookie("login_access_token", token, { httpOnly: false });
      return res.redirect(`/#/home?message=loginSuccess`);
    })
  })(req, res, next);   // 미들웨어내부에서 다른미들웨어 호출
});

// local 로그아웃
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();                           //req.user객체 제거
  req.session.destroy();                  //session값 제거 (user.id값넣어둔거)
  res.clearCookie('login_access_token');  // 토큰쿠기제거
  res.clearCookie('connect.sid');         // 세션쿠키제거
  return res.send("logoutSeccess");
});

module.exports = router;