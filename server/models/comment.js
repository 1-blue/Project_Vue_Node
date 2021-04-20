const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      comment: {
        type: Sequelize.STRING(50),
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Comment",
      tableName: "comments",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    });
  }

  static associate(db){
    // 유저와 댓글 1 : N
    db.Comment.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });

    // 포스트와 댓글 1 : N
    db.Comment.belongsTo(db.Post, { foreignKey: "postId", targetKey: "id" });

    // 댓글과 댓글 1 : N (대댓글)
    db.Comment.hasMany(db.Comment, { foreignKey: "commentId", targetKey: "id" });
  }
}