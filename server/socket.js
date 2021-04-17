const SocketIO = require('socket.io');
const { User, Room, Chatting } = require("./models");

module.exports = server => {
  const io = new SocketIO.Server(server, 
    { path: '/socket.io',
      cors: {
        origin: "http://localhost:9000",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
      },
    allowEIO3: true,
    pingInterval: 3000,
    pingTimeout: 5000,
  });

  // 클라이언트가 접속했을경우 연결
  io.on('connection', (socket) => {
    //const req = socket.request;                                                   // req객체얻기
    //const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;    // 접속유저 ip얻기

    console.log(`새로운 클라이언트 접속 ${socket.id}`);

    // 접속해제 disconnecting으로해야 socket.id얻을 수 있음
    socket.on('disconnecting', () => {
      console.log(`클라이언트 접속해제 ${socket.id}`);
      socket.nickname = null;
    });

    // 채팅방 방생성
    socket.on("createdRoom", async (roomName, nickname) => {
      // room이름중복체크
      const overlapCheck = await Room.findOne({ where: { name: roomName } });
      if(overlapCheck){
        socket.emit("roomNameOverlap", roomName);
        return;
      }

      // DB에 방생성
      const room = await Room.create({ name: roomName });
      
      // user - room 사이의 관계 N : M이므로
      // 중간테이블이 생겨서 중간테이블에 각 테이블을 참조하는 id값을 넣음
      const user = await User.findOne({ where: { nickname } });
      await user.addRoom(room);

      // 유저의 닉네임, 룸의 이름 저장
      socket.nickname = nickname;
      socket.roomName = roomName;
    });

    // 채팅방 참가
    socket.on("joinRoom", async (roomName, nickname) => {
      socket.join(roomName);

      // 유저의 닉네임, 룸의 이름 저장
      socket.nickname = nickname;
      socket.roomName = roomName;

      // 유저 입장메시지 전송
      io.to(roomName).emit("system", `${nickname}님이 채팅방에 입장하셨습니다.`);
    });

    // 채팅방 퇴장
    socket.on("leaveRoom", async () => {
      // 유저 퇴장 메시지 전송
      io.to(socket.roomName).emit("system", `${socket.nickname}님이 채팅방에 퇴장하셨습니다.`);

      // 방에서 나가기
      socket.leave(socket.roomName);

      socket.roomName = null;
    });

    // 채팅
    socket.on("sendMyChatting", async (chat) => {
      // 해당하는 room에 채팅전송
      io.to(socket.roomName).emit("sendAllChating", chat, socket.nickname);

      const { roomName, nickname } = socket;

      // 해당 유저의 id찾기
      const userId = await User.findOne({
        where: { nickname },
        attributes: ["id"],
      });

      // 해당 유저가 속한 room의 id찾기
      const roomId = await Room.findOne({
        where: { name: roomName },
        attributes: ["id"],
      });

      // + 채팅 DB에 저장
      Chatting.create({
        content: chat,
        userId: userId.id,
        roomId: roomId.id,
      });
    });

    socket.on('error', error => {
      console.error(`에러 : ${error}`);
    });
  });
}