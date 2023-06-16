const msgCodeBook = require('../../../../MessageCodeBook/msgCodeBook')
const mw_LoginCheck = require('../Middleware/mw_LoginCheck');

function loginCheck (app){
    app.get('/logincheck', mw_LoginCheck,function(req,res){
        let msgCode = 'msg6'
        res.status(200).json({dr:true, msgCode: msgCode, msg : msgCodeBook[msgCode]}) // dr = designed_response
      })
}

module.exports = loginCheck;