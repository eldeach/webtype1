// ======================================================================================== [Import Component] js
const mw_LoginCheck = require('./Middleware/mw_LoginCheck');

function logout(app){
    app.get('/logout', mw_LoginCheck,function(req,res){
        req.session.destroy(async() =>
        {
          res.clearCookie('connect.sid');
        });
      })
}
module.exports = logout;