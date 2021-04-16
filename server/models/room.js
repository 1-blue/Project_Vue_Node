const Sequelize = require("sequelize");

module.exports = class Room extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      title: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      personal: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: true,
      paranoid: true,
      underscored: false,
      modelName: "Room",
      tableName: "rooms",
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  }

  static associate(db){
    // 유저와 채팅방 N : N
    db.Room.belongsToMany(db.User, { through: "UserRoom", foreignKey: "roomId", targetKey: "id" });

    // 채팅방과 채팅 1 : N
    db.Room.hasMany(db.Chatting, { foreignKey: "roomId", targetKey: "id" });
  }
}