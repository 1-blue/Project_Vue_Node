const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');

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

// 라우터
const indexRouter = require('./routes');
app.use('/', indexRouter);

// 404에러처리
app.use((req, res, next) => {
  res.send(`404처리미들웨어`);
});

// 에러처리
app.use((err, req, res, next) => {
  console.error(`에러미들웨어 : ${err}`);
  res.send('Error');
});

app.listen(app.get('port'), ()=>{
  console.log(`${app.get('port')}번 대기중`);
});