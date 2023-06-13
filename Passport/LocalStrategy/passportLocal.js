// ======================================================================================== [Import Libaray]
const passport = require('passport'); // passport 임포트
const LocalStrategy = require('passport-local').Strategy; // passport 로컬 인증 전략 적용
const session = require('express-session'); // 세션 라이브러리

// ======================================================================================== [Import Component] js
const msgCodeBook = require('../../MessageCodeBook/msgCodeBook')
const authCheck = require('./AuthFunctions/authCheck');
const mw_LoginCheck = require('./AuthFunctions/Middleware/mw_LoginCheck');
const logout = require('./AuthFunctions/logout');
const userExist = require('./AuthFunctions/userExist');
const userLock = require('./AuthFunctions/userLock');
const pwCheck = require('./AuthFunctions/pwCheck');




function passportLocal(app){
    const expireTimeMinutes=process.env.passport_session_expire_time_minutes
    app.use(session({secret : process.env.passport_secret_code, resave : false, saveUninitialized: false, cookie: { maxAge : expireTimeMinutes*60000 }, rolling:true}));
    app.use(passport.initialize());
    app.use(passport.session());
    //===================================================================================== 미들웨어 선언 밑에다 개발해야함
    authCheck(app);
    logout(app);

    app.get('/local-login-fail', function(req,res){

      let msgCode =req.session.flash.error.slice(-1)[0]
      res.status(401).json({dr:true, msgCode: msgCode, msg : msgCodeBook[msgCode]}) // dr = designed_response
    })
    
    app.get('/local-login-success', mw_LoginCheck, function (req, res) {
      res.status(200).json({dr:true, msgCode:'msg1', msg:msgCodeBook.msg1.eng})
    })


    app.post('/local-login', passport.authenticate('local', {successRedirect :"/local-login-success",failureRedirect : '/local-login-fail', failureFlash : true}));
    passport.use(new LocalStrategy({
      usernameField: 'user_account', // form에서 전달받은 값 중 username으로 사용할 html div의 id 값
      passwordField: 'user_pw', // form에서 전달받은 값 중 password로 사용할 html div의 id 값
      session: true,
      passReqToCallback: false,
    }, function (userID, userPW, done) { // 첫번째 인자는 위에서 지정한 usernameField 값, 두번째 인자는 passwordField 값
      if(userExist(userID)){
        if(userLock(userID)){
          return done(null,false,{message : 'msg2'})
        }
        else if(pwCheck(userID, userPW)){
          return done(null,userID) // 두번째 인자가 TRUE이면 세션 발급,
        }
        else{
          return done(null,false,{message : 'msg3'})
        }
      }
      else{
        return done(null,false,{message : 'msg4'}) 
      }  
    }));
    
    passport.serializeUser(function (userID, done) {
      console.log("-------")
      console.log(userID)
      console.log("Session was created.")
      return done(null,userID)
      
    });
    
    passport.deserializeUser(function (userID, done) {
      console.log(3)
      done(null,userID)
    });
}
module.exports = passportLocal;