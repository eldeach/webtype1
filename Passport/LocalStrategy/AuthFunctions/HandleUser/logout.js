// ======================================================================================== [Import Libaray]

// ======================================================================================== [Import Component] js
const msgCodeBook = require('../../../../MessageCodeBook/msgCodeBook')

function logout(app){
    app.get('/logout', function(req,res){
        req.session.destroy(async() =>
        {
          res.clearCookie('connect.sid');
          console.log("logout")
          let msgCode = 'msg7'
          res.status(200).json({dr:true, msgCode:msgCode, msg:msgCodeBook[msgCode]})
        });
      })
}
module.exports = logout;