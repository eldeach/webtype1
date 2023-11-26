// ======================================================================================== [Import Component] js
const mw_LoginCheck = require('../Middleware/mw_LoginCheck');

function authCheck(app){
    app.get('/auth-check',mw_LoginCheck,function(req, res){
        console.log(req.query)
        if (req.query.required == 'aaa'){
          res.send(true)
        }
        else{
          res.send(false)
        }
      })
}

module.exports = authCheck;