// ======================================================================================== [Import Libaray]
const passport = require('passport'); // passport 임포트
const LocalStrategy = require('passport-local').Strategy; // passport 로컬 인증 전략 적용
const session = require('express-session'); // 세션 라이브러리

function passportLocal(app){
    const expireTimeMinutes=process.env.passport_session_expire_time_minutes
    app.use(session({secret : process.env.passport_secret_code, resave : false, saveUninitialized: false, cookie: { maxAge : expireTimeMinutes*60000 }, rolling:true}));
    app.use(passport.initialize());
    app.use(passport.session());


    app.post('/local-login', passport.authenticate('local', {successRedirect :"/",failureRedirect : '/', failureFlash : true}));

    passport.use(new LocalStrategy({
      usernameField: 'user_account', // form에서 전달받은 값 중 username으로 사용할 html div의 id 값
      passwordField: 'user_pw', // form에서 전달받은 값 중 password로 사용할 html div의 id 값
      session: true,
      passReqToCallback: false,
    }, function (userID, userPW, done) { // 첫번째 인자는 위에서 지정한 usernameField 값, 두번째 인자는 passwordField 값
      if(userID==='a'){
        console.log(1)
        return done(null,userID) // 두번째 인자가 TRUE이면 세션 발급,
      }
      else{
        console.log(2)
        return done(null, false, {message:"fail"})
      }  
    }));
    
    passport.serializeUser(function (userID, done) {
      console.log("-------")
      console.log(userID)
      done(null,userID)
      console.log("Session was created.")
    });
    
    passport.deserializeUser(function (user_id, done) {
      console.log(3)
    });
}
module.exports = passportLocal;