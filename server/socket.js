const SocketIO = require('socket.io');

module.exports = server => {
  const io = new SocketIO.Server(server, 
    { path: '/socket.io',
      cors: {
        origin: "http://localhost:9000",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
      },
    allowEIO3: true
  });

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log(`새로운 클라이언트 접속${ip}, ${socket.id}, ${req.ip}`);

    socket.on('disconnect', () => {
      console.log(`클라이언트 접속해제 ${ip}, ${socket.ip}`);
    });

    io.emit('sendClientId', socket.id);

    socket.on('error', error => {
      console.error(`에러 : ${error}`);
    });

    // 클라로부터 전송받은 데이터 다시 클라로 전송
    socket.on('sendChatting', (data) => {
      io.emit('getChatting', data.chatting);
    });
  });
}