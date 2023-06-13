function sendMsgCodeBook(app){
    app.get('/msgcodebook',function(req, res){
        console.log(req.query)
        if (req.query.required == 'aaa'){
          res.send(true)
        }
        else{
          res.send(false)
        }
      })
}
module.exports = sendMsgCodeBook;