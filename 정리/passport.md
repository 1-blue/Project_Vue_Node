###### passport
전략이라는단어를 이용해서 여러가지 인증전략을 사용하고 있음
그중에서 로그인에 적합한 local전략 ( id, pw 사용 인증 )을 사용함
인증순서
1. app에서 localStrategy, passport.initialize(), passport.session() 등록
2. 클라이언트에서 로그인 신호를 보냄
3. passport.authenticate('local', callback)에서 local까지만 보고
4. app에서 등록한 localStrategy의 local을 찾아감
5. req.body에 들어있는 id, pw를 이용해서 사용자인증을함
6. 각 분기처리를 해서 done의 두번째인자에 로그인성공한 사용자의 정보를 넘겨줌
7. passport.authenticate의 콜백함수로 넘어감 (done이 콜백함수임)
8. passport.authenticate에서 처리후 req.login()호출
9. serializeUser호출됨 req.login인자가 매개변수로 들어감
10. done에서 전송한 값이 세션에 저장됨
11. 페이지 이동할 때 마다 deserializeUser() 호출되고 passport.sesison()이 실행되어 인자로 유저의 값이 들어옴
12. 결국 deserializeUser()호출됨으로 req.user에 유저정보가 저장됨

login전송 -> passport-local전략사용 -> 정의해둔 localStrategy이동 -> 각종 조건검사 (유저존재여부, db에러여부 등) -> done(passport.authenticate)호출
-> 전송받은 인자로 문제해결처리 -> 문제없으면 로그인성공이므로 req.login()호출 -> req.login()의 매개변수들이 serializeUser의 인자로 들어가서 호출됨
-> serializeUser의 done()의 두번째인자로 주는값이 passport.session()에 의해 저장됨 -> 다른페이지 이동할때마다 deserializeUser()호출되고 그로인해 req.user에 유저정보가 저장됨