const router = require('express').Router();
const { User, Post, Comment, sequelize } = require('../models');
const { isLoggedIn } = require('../middleware');

// 해당 게시글 상세정보가져오기
router.get('/:postId', isLoggedIn, async (req, res) => {
  const { postId } = req.params;

  try {
    const targetPost = await Post.findOne({ 
      where: { id: postId },
      attributes: [ "id", "title", [ sequelize.fn('date_format', sequelize.col('post.createdAt'), '%Y-%m-%d'), "dateFormat"], "content" ], 
      include: { model: User, attributes: ["id", "nickname"] }
    });

    return res.json(targetPost);
  } catch (error) {
    return res.send(error);
  }
});

// 전체 게시글 정보 가져오기
router.get('/', async (req, res) => {
  try {
    // 게시글페이지에서 필요한것만 불러오기 ( title, update시간, 게시글작성자 )
    const posts = await Post.findAll({
      attributes: [ "id", "title", [ sequelize.fn('date_format', sequelize.col('post.createdAt'), '%Y-%m-%d'), "dateFormat"] ], 
      include: { model: User, attributes: ["id", "nickname"] }
    });
    
    return res.json(posts);
  } catch (error) {
    return res.send(error);
  }

});

// 게시글 추가하기
router.post('/append', isLoggedIn, async (req, res) => {
  const { title, content } = req.body;

  try {
    await Post.create({
      title,
      content,
      userId: req.user.id
    });    
  } catch (error) {
    return res.redirect("/#/community?state=postAppendError")
  }

  return res.redirect("/#/community");
});

// 게시글의 댓글 가져오기
router.get('/comment/:postId', isLoggedIn, async (req, res) => {
  const { postId } = req.params;
  let commentList = null;

  try {
    commentList = await Comment.findAll({
      where: { postId },
      attributes: [ "id", "comment", "commentId", "userId", [ sequelize.fn('date_format', sequelize.col('comment.updatedAt'), '%d일 %h:%i:%s'), "dateFormat"] ],
      include: { model: User, attributes: ["nickname"]}
    });
  } catch (error) {
    return res.send(error);
  }

  return res.json(commentList);
});

// 게시글에 댓글입력하기
router.post('/comment', isLoggedIn, async (req, res) => {
  const { postId, comment, nickname } = req.body;
  let userId = null;

  try {
    userId = await User.findOne({ where: { nickname }, attributes: ["id"] });
  } catch (error) {
    return res.redirect(`/#/community/${postId}?state=userFindError`);
  }
    
  try {
    await Comment.create({
      comment,
      userId: userId.id,
      postId,
    });
  } catch (error) {
    return res.redirect(`/#/community/${postId}?state=commentAppendError`);
  }

  return res.redirect(`/#/community/${postId}`);
});

// 대댓글 입력하기
router.post("/recomment", isLoggedIn, async (req, res) => {
  const { nickname, postId, commentId, comment } = req.body;
  
  try {
    const userId = await User.findOne({ where: { nickname }, attributes: ["id"] });
    await Comment.create({
      userId: userId.id,
      postId,
      commentId,
      comment
    });
  } catch (error) {
    return res.redirect(`/#/community/${postId}?state=recommentAppendError`);
  }

  return res.redirect(`/#/community/${postId}`);
});

module.exports = router;