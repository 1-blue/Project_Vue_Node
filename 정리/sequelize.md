###### sequelize
sequelize란 ORM으로 가상의 데이터베이스를 코드상에서 구현해서 가상의 데이터베이스와 실제 데이터베이스를 맵핑해서 가상의 데이터베이스를 변경해도 실제데이터베이스가 변경되도록 해주는것?
sequelize를 사용하면 기본적으로 제공해주는 기능들도 많으며 직접 SQL문을 사용하지않아도 형식을 정의해주면 자동적으로 SQL로 변환해주기때문에 편리함

#### 기본적인 형태
## index.js
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const User = require('./user.js');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);   // db와 node.js연결

db.sequelize = sequelize;

db.User = User;

db.User.init(db.sequelize);

db.User.associate(db);

module.exports = db;    // db객체에 sequelize, model모두 넣어두고 db를 require해서 편하게 사용

## model/user.js
const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {   // 약속된 구조이므로 구조는 변경하면안됨
  static init(sequelize){
    return super.init({     // 여기밑에 column들 정의
      identify: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
      },
    }, {
      sequelize,          // 요거안넣으면 오류남
      timestamps: true,   // createdAt, updatedAt, deleteAt 자동으로 넣어줄지
      paranoid: false,    // 삭제해도 데이터남겨둘지말지 deleteAt에 시간만 적어짐
      underscored: false, // 대문자 _  뭘로구분할지지정
      modelName: "User",  // sequelize에서 사용할 모델명
      tableName: "users", // 실제 DB에서 사용할 테이블명
      charset: "utf8",    // 한글가능..           밑에꺼랑 둘다 mb4붙이면 특수문자도 입력가능
      collate: "utf8_general_ci",   // charset과 같은의미인것같은데
    });
  }

  static associate(db){     // 테이블, 즉 모델간의 관계를 정의하는 부분
    // 유저와 채팅방 M : N
    db.User.belongsToMany(db.Room, { through: "UserRoom", foreignKey: "userId", targetKey: "id" });

    // 유저와 채팅 1 : N
    db.User.hasMany(db.Chatting, { foreignKey: "userId", targetKey: "id" });
  }
}
## 관계정의
1. belongsTo : 포함
2. hasMany : 가짐
3. belongsToMany : 가지고 포함됨

일단 관계에서는 1 : 1, 1 : N, N : M 관계들이 있음
1. 1 : 1
둘다 belognsTo로 연결하면됨
2. 1 : N
많이가지는놈 hasMany
속하는놈 belongsTo
3. N : M
둘다 belongsToMany

한글그대로 해석하면됨
여기서 알아야할것
foreignKey : 참조키를 가질 테이블에 생성될 column명을 정하는것
참조키를 가질 테이블이란 1 : N에서 N쪽 즉, belongsTo로 지정한곳에 참조키가 생성됨

targetKey : 참조당하는쪽의 column명을 정해줘야함
참조당하는거니까 unique한걸로 지정해주는것이 맞음 (본인임을 증명할 수 있는 식별자.. 주민번호같은거. 중복될 수 없는것)

through : (N : M)관계일 때는 필연적으로 새로운 테이블이 생길 수 밖에 없음
ex) 전부 id만 있다고 가정하고
user     room       user_room
  1       1           1    2 
  2       2           1    3
  3       3           3    1
  4       4           4    1
user 1이 room2를 참조한다고 했을때 1 : N 관계라면
room에 userId를 넣어서 참조하면 되겠지만 N : M이라면
user1에서도 room2를 참조해야하고
room2에서도 user1을 참조해야하는데 새로운테이블을 만들지않고서는 구현할 수 없음 (사실 아직 제대로 이해못하겠음)
따라서 새로운 테이블이 생성되며 그테이블 이름은 자동적으로 두개의 테이블명이 합쳐지는데
원하는대로 정의하고 싶을 때 through : "테이블명"을 하면 원하는 테이블명이 생성됨
as : 이름 바꾸는것 기본적으로 제공되는 이름말고 다른이름으로 바꿔서 사용함
주로 자기가 자기자신과 (N : M)일경우 사용함

위와같이 관계정의를 하고나면 자동적으로
get, set, add, remove메서드가 생성됨
ex) const user = await User.findOnd({ where: { id: 1 } });
user.getComments();                  // 유저와 연동된 comment들을 가져옴
user.setComments(comment의 배열);     // 유저와 연동된 comment들을 수정
user.addComment(comment);            // 유저와 연동된 comment들을 하나추가함
user.addComments(comment의 배열);     // 유저와 연동된 comment들을 추가함
user.removeComments(comment의 배열);  // 유저와 연동된 comment들을 수정

## 각종알아야할것
# 함수사용 기본형식 [sequelize.fn("사용할 함수명", 사용할 column, "포멧형식"), "대체할 column명"]
대표적 사용예) attributes: [ "title", [ sequelize.fn('date_format', sequelize.col('post.createdAt'), '%Y-%m-%d'), "dateFormat"] ]