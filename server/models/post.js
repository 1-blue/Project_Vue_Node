const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      title: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(200),
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Post",
      tableName: "posts",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    });
  }

  static associate(db){
    // 유저와 포스트 1 : N
    db.Post.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });

    // 포스트와 댓글 1 : N
    db.Post.hasMany(db.Comment, { foreignKey: "postId", targetKey: "id" });
  }
}