// ======================================================================================== [Import Libaray]
const passport = require('passport'); // passport 임포트
const LocalStrategy = require('passport-local').Strategy; // passport 로컬 인증 전략 적용
const session = require('express-session'); // 세션 라이브러리

const bcrypt = require('bcrypt'); // bcrypt 라이브러리 
const saltRounds = 10;


// ======================================================================================== [Import Component] js
const msgCodeBook = require('../../MessageCodeBook/msgCodeBook');
const passportLocalMsg = require('./passportLocalMsg');

const {sendQry, selectQry, insertQry, updateQry, batchInsertFunc, batchInsertOnDupliFunc, whereClause, truncateTable} = require ('../../dbconns/maria/thisdb');

const mw_LoginCheck = require('./Middleware/mw_LoginCheck');
const logout = require('./UserChk/logout');
const authCheck = require('./UserChk/authCheck');
const pwFailCount = require('./UserChk/pwFailCount')
const userLock = require('./UserChk/userLock');
const userExist = require('./UserChk/userExist');
const pwCheck = require('./UserChk/pwCheck');




function passportLocal(app){
  const expireTimeMinutes=process.env.passport_session_expire_time_minutes
  app.use(session({secret : process.env.passport_secret_code, resave : false, saveUninitialized: false, cookie: { maxAge : expireTimeMinutes*60000 }, rolling:true}));
  app.use(passport.initialize());
  app.use(passport.session());
  //===================================================================================== 미들웨어 선언 밑에다 개발해야함
  authCheck(app);
  logout(app);

  app.post('/local-login', passport.authenticate('local', {successRedirect :"/local-login-success",failureRedirect : '/local-login-fail', failureFlash : true}));
    
  app.get('/local-login-success', mw_LoginCheck, function (req, res) {
    res.status(200).json(passportLocalMsg.loginSuccess) // dr = designed_response
  })

  app.get('/local-login-fail', function(req,res) {
    console.log(req.session.flash.error)
    res.status(401).json(passportLocalMsg.loginFail[req.session.flash.error.slice(-1)[0]]) 
  })
    

  passport.use(new LocalStrategy({
    usernameField: 'user_account', // form에서 전달받은 값 중 username으로 사용할 html div의 id 값
    passwordField: 'user_pw', // form에서 전달받은 값 중 password로 사용할 html div의 id 값
    session: true, // 세션 사용 여부 : true
    passReqToCallback: false,
  }, async function (userID, userPW, done) { // 첫번째 인자는 위에서 지정한 usernameField 값, 두번째 인자는 passwordField 값, passReqToCallback : true이면 맨 앞에 req 객체를 받을 수 있음
    let rs = await sendQry(selectQry({
      cols : ["*"],
      tblName : "tb_user",
      whereClause : "user_account = '".concat(userID).concat("'")
    }));
    if (rs.length === 1) {
      if(rs[0].user_lock) {
        return done (null, false, {message : "userLock"})
      } else if (bcrypt.compareSync(userPW, rs[0].user_pw)) {
        return done (null,userID) // 두번째 인자가 TRUE이면 세션 발급,
      } else {
        return done (null, false, {message : "wrongPW"}) // 패스워드가 틀린경우
      }
    }
    else{
      return done (null, false, {message : "noAccount"}) 
    }  
  }));
  
  passport.serializeUser(function (userID, done) {
    console.log("serialize")
    return done(null,userID)
    
  });
  
  passport.deserializeUser(function (userID, done) {
    console.log("deserialize")
    done(null,userID)
  });
}
module.exports = passportLocal;