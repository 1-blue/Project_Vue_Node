const router = require('express').Router();
const { Room, Chatting, User } = require('../models');
const { isLoggedIn } = require('../middleware');

// 채팅방목록 가져오기
router.get('/room', isLoggedIn, async (req, res) => {
  const rooms = await Room.findAll();

  return res.json(rooms);
});

// 채팅방삭제권한 있는지 전송
router.get('/room/:nickname', isLoggedIn, async (req, res) => {
  // 로그인한 유저찾음
  const { nickname } = req.params;
  const user = await User.findOne({ where: { nickname } });

  // 유저에 참조된 room을 찾음 (room의 값으로 front에서 삭제권한부여)
  const rooms = await user.getRooms();

  return res.json(rooms);
});

// 채팅방삭제
router.delete('/room/:name', isLoggedIn, async (req, res) => {
  const { name } = req.params;

  // 채팅방 아이디 찾기
  const roomId = await Room.findOne({ where: { name }, attributes: ["id"] });

  // 채팅방에 참조된 채팅찾기
  const chattings = await Chatting.findAll({ where: { roomId: roomId.id } })

  // 채팅삭제
  chattings.forEach(async (v) => {
    await Chatting.destroy({ where: { id: v.id } });
  });
  
  // 채팅방삭제
  try {
    await Room.destroy({ where: { name } });
  } catch (error) {
    return res.send(error);
  }

  return res.send("success");
});

// 채팅방의 채팅기록가져오기
router.get('/chatting/:name', isLoggedIn, async (req, res) => {
  // 채팅방 이름
  const { name } = req.params;

  // 채팅방이름으로 채팅방 id찾기
  const roomId = await Room.findOne({ where: { name } });

  // room에 해당하는 채팅기록 + 해당유저닉네임 불러오기
  const chatting = await Chatting.findAll({
    where: { roomId: roomId.id },
    include: {
      model: User,
      attributes: ["nickname"],
    }
  });

  return res.json(chatting);
});

module.exports = router;