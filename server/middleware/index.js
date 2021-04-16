const { User } = require('../models');
const dotenv = require('dotenv');
dotenv.config();

// 회원가입시 아이디 중복검사
exports.idOverlapCheck = async (req, res, next) => {
  const { identify } = req.body;
  const user = await User.findOne({ where: { identify } })

  if(user){
    return res.redirect("http://localhost:9000/#/register?message=idOverlap")
  }
  
  return next();
}

// 회원가입시 닉네임중복검사
exports.nicknameOverlapCheck = async (req, res, next) => {
  const { nickname } = req.body;
  const user = await User.findOne({ where: { nickname } })

  if(user){
    return res.redirect("http://localhost:9000/#/register?message=nicknameOverlap")
  }
  
  return next();
}

// 로그인했는지검사
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {        // 로그인중일때 true반환
      next();
  } else {
      res.status(403).send('로그인필요');
  }
};

// 로그인안했는지검사
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      next();
  } else {
      const message = encodeURIComponent('로그인한 상태입니다.');
      req.redirect(`/?error=${message}`);
  }
};