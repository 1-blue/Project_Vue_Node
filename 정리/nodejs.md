=================================================================================================
###### node
Chrome V8 javascript엔진으로 빌드된 javascript런타임

###### 런타임
특정 언어로 만든 프로그램이 실행할 수 있는 환경

###### 서버
네트워크를 통해 클라이언트에 정보나 서비스를 제공하는 컴퓨터 or 프로그램

###### 네트워크
컴퓨터들이 통신 기술을 이용하여 그물망처럼 연결된 통신 이용 형태

###### 이벤트루프
  <호출스택>     <백그라운드>
┌━━━━━━━━━━┐    ┌━━━━━━━━━━┐
┃          ┃    ┃          ┃
┃          ┃ -> ┃          ┃
┃          ┃    ┃          ┃
└━━━━━━━━━━┘    └━━━━━━━━━━┘
  ↑   <태스크큐>      ┃
┌━━━━━━━━━━━━━━━━┐   ┃
┃                ┃   ┃
┃                ┃  <┘
└━━━━━━━━━━━━━━━━┘
### javascript코드실행순서
0. 호출스택에서 자기차례일경우 실행
1. 이벤트 발생시 호출스택에 이벤트 들어감
2. 타이머나 이벤트리스너같은경우 백그라운드로 들어가서 지정된 시간까지 대기
3. 백그라운드에서 시간완료시 태스크큐로 전달
4. 호출스택이 비워져있을경우 태스크큐에서 호출스택으로 전달
5. 호출스택에서 자기차례일경우 실행

###### 블로킹/논블로킹
블로킹 : 이전작업이 끝나면 다음작업 실행
논블로킹 : 이전작업이 끝나기 전에 다음작업 실행
I/O작업들은 네트워크로 처리하기때문에 백그라운드로 넘겨주면 동시에 처리할 수 있음

###### 프로세스와 스레드
           <운영체제>
┌━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┐
┃<프로세스1>   <프로세스2>      ┃
┃ ┌━━━━━┐      ┌━━━━━┐         ┃
┃ ┃     ┃      ┃     ┃         ┃
┃ ┃ ┌━┐ ┃      ┃ ┌━┐ ┃ ←스레드1 ┃
┃ ┃ └━┘ ┃      ┃ └━┘ ┃         ┃
┃ ┃ ┌━┐ ┃      ┃ ┌━┐ ┃ ←스레드2 ┃
┃ ┃ └━┘ ┃      ┃ └━┘ ┃         ┃
┃ └━━━━━┘      └━━━━━┘         ┃
└━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┘
### 프로세스
운영체제가 할당하는 작업의 단위

### 스레드
프로세스내에서 실행되는 흐름의 단위
스레드끼리는 같은 부모프로세스의 데이터를 공유할 수 있음

###### node공식문서
#### 1. node종료
process.exit(0);    // 정상종료
process.exit(1);    // 에러로 인한 종료

#### 2. 환경변수읽기
process.env

#### 3. REPL실행
node
.save: REPL 세션에 입력 한 모든 내용을 파일에 저장합니다 (파일 이름 지정).

#### 4. process.argv
첫번째인수 : node의 절대경로
두번째인수 : 현재실행파일의 절대경로
세번째부터 실행시 입력한 매개변수값
ex) node app.js joe
process.argv[2] => joe

#### 5. readline
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`What's your name?`, name => {
  console.log(`Hi ${name}!`)
  readline.close()
})

#### 6. require()
## 예시 (lib.js일경우)
1. car = { ... }
module.exports = car
2. exports.car = { ... }
## 사용
1번 require('./lib').name
2번 require('./lib').car.name
단 두개를 섞어서 사용하면 먼저 사용한것이 덮어씌워져서 사라짐

#### 7. npm
## npm install 
현폴더의 node_modules에 설치함

## npm install -g
"npm root -g"에 해당하는 폴더에 설치함

## npm list express
현재 express 설치되었는지 확인

## npm view express
express 정보를 알 수 있음

## npm view express versions
express의 버전정보들을 검색

## npm install express@1.0.0
express 1.0.0버전설치

## npm outdated
업데이트 가능한 패키지 보여줌

#### npm 버전관리
x.y.z
x : 주버전
y : 부버전
z : 패치버전
[규칙]
이전버전과 호환되지않을경우 x(주버전)를 올림
이전버전과 호환되며 기능추가일경우 y(부버전)를 올림
이전버전과 호환되며 버그수정일경우 z(패치버전)를 올림
^ : 가장 왼쪽숫자(주버전)이 변경되지않는 최대한의 업데이트를함 ex) ^0.13.0 => 0.14.3
~ : 중간숫자(부버전)이 변경되지않는 최대한의 업데이트 ex) ~0.13.0 => 0.13.3

#### npx
npm@5.2.0이상버전에서 사용가능 설치없이 실행할 수 있는 명령어
이미 깔려있는 패키지라면 설치된것을 실행하고 아니면 가장최신버전설치후 실행후 바로삭제함
ex) npx cowsay "hello"


#### Promise
## 선언예
function testFunc(bool) {
  return new Promise((resolve, reject) => {
    if(bool){
      return resolve("success");
    }
    return reject("fail");
  }) ;
}
## 사용예
testFunc(true)
  .then(v => console.log(v))
  .catch(console.error);

성공일경우 resolve값 반환 .then()의 매개변수로 값사용
실패일경우 reject .catch()의 매개변수로 값사용
.catch처럼 생략해서 사용도 가능

#### async/await
## 선언예
async function testFunc(){
  return test;
}
일경우 testFunc의 반환값은 무조건 Promise임
Promise를 반환하는 경우 받을 때 await을 앞에 붙이면 Promise의 반환값이 올 때 까지 기다렸다가 반환값전달되면 실행함
(await은 반드시 async내부에서 사용해야함)

#### path
const notes = '/users/joe/notes.txt'

path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt
path.basename(notes, path.extname(notes)) //notes

#### REST
서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법
주소는 명사를 사용함으로서 행위의 주체를 지정하고
동사는 http메소드를 사용함으로서 행위를 정함

#### HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html", "Set-Cookie": "fruit=apple" });
  res.write("");
  res.end("");
});
server.listen("8080", () => {});
## "req.method"를 이용해서 GET, POST, PUT, DELETE 등등을 구분
## "req.url"를 이용해서 /, /user 등등을 구분

#### HTTP 쿠키
서버에서 클라이언트에게 쿠키를 보내면 브라우저가 내부에 저장함
그리고 서버에게 요청을 보낼 때 갖고 있는 쿠키도 같이 동봉해서 보냄
## 보내는법
res.writeHead(200, { "Set-Cookie": "fruit=apple" });
## 받는법
req.headers.cookie

#### session
서버에 사용자의 정보를 저장하고 클라이언트에게는 sessionId를 전송해줌으로써 사용자의 개인정보를 보호힘
sessionId값을 받는 쿠키를 세션쿠키라고함




