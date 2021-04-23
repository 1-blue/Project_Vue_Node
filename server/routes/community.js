const router = require('express').Router();
const { User, Post, sequelize } = require('../models');
const { isLoggedIn } = require('../middleware');

// 게시글
router.get('/:postId', isLoggedIn, async (req, res) => {
  const { postId } = req.params;

  const targetPost = await Post.findOne({ 
    where: { id: postId },
    attributes: [ "id", "title", [ sequelize.fn('date_format', sequelize.col('post.createdAt'), '%Y-%m-%d'), "dateFormat"], "content" ], 
    include: { model: User, attributes: ["id", "nickname"] }
  });

  return res.json(targetPost);
});

// 채팅방목록 가져오기
router.post('/append', isLoggedIn, async (req, res) => {
  const { title, content } = req.body;

  await Post.create({
    title,
    content,
    userId: req.user.id
  });

  return res.redirect("/#/community");
});

router.get('/', async (req, res) => {
  // 게시글페이지에서 필요한것만 불러오기 ( title, update시간, 게시글작성자 )
  const posts = await Post.findAll({
    attributes: [ "id", "title", [ sequelize.fn('date_format', sequelize.col('post.createdAt'), '%Y-%m-%d'), "dateFormat"] ], 
    include: { model: User, attributes: ["id", "nickname"] }
  });
  
  return res.json(posts);
});

module.exports = router;