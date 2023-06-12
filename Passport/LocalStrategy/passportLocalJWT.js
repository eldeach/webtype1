// ======================================================================================== [Import Libaray]
const passport = require('passport'); // passport 임포트
const LocalStrategy = require('passport-local').Strategy; // passport 로컬 인증 전략 적용
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

function passportLocalJWT(app){
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload)
    return done(null, "a");
}));

app.post('/local-login', passport.authenticate('jwt', { session: false }),
function(req, res) {
    res.send('aa');
}
);

}

module.exports = passportLocalJWT;