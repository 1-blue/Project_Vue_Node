const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      identify: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nickname: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      }
    }, {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "User",
      tableName: "users",
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  }

  static associate(db){
    // 유저와 채팅방 M : N
    db.User.belongsToMany(db.Room, { through: "UserRoom", foreignKey: "userId", targetKey: "id" });

    // 유저와 채팅 1 : N
    db.User.hasMany(db.Chatting, { foreignKey: "userId", targetKey: "id" });

    // 유저와 포스트 1 : N
    db.User.hasMany(db.Post, { foreignKey: "userId", targetKey: "id" });

    // 유저와 댓글 1 : N
    db.User.hasMany(db.Comment, { foreignKey: "userId", targetKey: "id" });
  }
}