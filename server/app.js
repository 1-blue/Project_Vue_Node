const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');

// DB
const { sequelize } = require('./models');

// passport
const passport = require('passport');
const passportConfig = require('./passport');

// 소켓
const webSocket = require('./socket.js');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 9000);

// 미들웨어
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: false,
  }
}));

// DB연결
sequelize.sync({ force: false })
  .then(() => {
    console.log("DB연결성공");
  })
  .catch((error) => {
    console.error(`DB연결실패 : ${error}`)
  });

// passport 실행
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// 라우터
const indexRouter = require('./routes');
const authRouter = require('./routes/auth.js');
const talkRouter = require('./routes/talk.js');
const communityRouter = require('./routes/community.js');
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/talk', talkRouter);
app.use('/community', communityRouter);

// 404에러처리
app.use((req, res, next) => {
  res.send(`404처리미들웨어`);
});

// 에러처리
app.use((err, req, res, next) => {
  console.error(`에러미들웨어 : ${err}`);
  res.send(err);
});

const server = app.listen(app.get('port'), ()=>{
  console.log(`${app.get('port')}번 대기중`);
});

webSocket(server);