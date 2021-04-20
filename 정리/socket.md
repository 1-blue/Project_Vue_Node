###### socket.io
실시간 채팅기능을 구현할 때 사용하기 용이하도록 정의된 패키지

#### 기본연결방식
const app = express();
const server = app.listen(~~);
const io = new SocketIO.Server(server);

위같은 형식으로 io생성하면됨
현재 io의 옵션값으로 path말고도 이것저것붙여줬는데 이유는 모르겠으나 에러가떠서 구글링해서 찾은걸 그냥 적어줬음 (이유는 나중에 찾겠음.. 현재는 구현하는데 집중)

#### 접속 및 이벤트연결
io.on("connetion", socket => { ... });
소켓에 연결했을 때 콜백함수 실행 (인수로 socket객체가 들어오도록 약속됨)

socket.on("이벤트", 콜백);
위같은 형식으로 구현하면됨

1. disconnecting : 접속해제시 실행 (disconnect도 있는데 이거는 soeket.id를 얻을 수 없음)
2. error : 에러발생시 실행됨 콜백인수에 error객체전송됨

클라이언트에서 
socket.emin("이벤트명", 변수1, 변수2 ..); 형식으로 전송하면
서버에서 미리정의해둔
socket.on("이벤트명", (변수1, 변수2 ...) => { ... }); 형식으로 받아서 대응할 수 있음
서버에서 클라로 전송할 때도 같은방식으로 하면됨

socket.io에는 namespace와 room이라는것이 있는데
#### namespace
namespace는 현재코드에서 사용하지않아서 간단하게 정리함
일단 namespace > room > socket 처럼 관계를 생각하면되고 ... 기본 네임스페이스는 '/'로 알고있음
서버측)
let nsp = io.of('/test');    // /test인 네임스페이스 생성
nsp.on("이벤트명", 콜백);     // /test인 네임스페이스로 이벤트전송
클라측)
let nsp = io('/test');

#### room
기본적으로 join과 leave로 방에 출입을 할 수 있음 (방이름은 아무거나 가능)
socket.join("방이름");
socket.leave("방이름");

원하는 방에 값을 주는방법은
io.to("방이름").emit("이벤트명", "값");

자기자신제외한 모두에게 전송 (io -> socket.broadcast)
socket.broadcast.to(socket.roomName).emit("system", `${socket.nickname}님이 채팅방에 퇴장하셨습니다.`);

받는방법이 없는거는
클라 -> 서버 -> 방검색 -> 방에 값전달 같은형식이라
어차피 주고받을때 서버로 전송할 수 밖에 없음
서버에서 각각의 방으로 데이터를 전송하는것


#### 소켓에서 await하는법이 있나?
지금 문제가 하나있는게
소켓으로 방을 생성해서 DB에 추가하는데
DB에 추가하기전에 다른코드를 실행해서 화면에 데이터가 붙지를 않음
await socket.emit()뭐 이런코드를 써도 기다려주지를않아서 해결방법을 찾아야함