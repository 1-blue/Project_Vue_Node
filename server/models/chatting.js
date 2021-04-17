const Sequelize = require("sequelize");

module.exports = class Chatting extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      content: {
        type: Sequelize.STRING(100),
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Chatting",
      tableName: "chattings",
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  }

  static associate(db){
    // 채팅방과 채팅 1 : N
    db.Chatting.belongsTo(db.Room, { foreignKey: "roomId", targetKey: "id" });

    // 유저와 채팅 1 : N
    db.Chatting.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
  }
}