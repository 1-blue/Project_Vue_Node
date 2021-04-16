const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'identify',
        passwordField: 'password'
    }, async (identify, password, done) => {
        try {
            const exUser = await User.findOne({ where: { identify } });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: "비밀번호가 일치하지 않습니다." });
                }
            }
            else{
                done(null, false, { message: "가입되지않은 유저입니다." });
            }
        } catch (error) {
            done(error);
        }
    }));
};