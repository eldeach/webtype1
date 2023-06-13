function mw_LoginCheck(req, res, next) { // 세션을 얻어 로그인이 되어 있는지만 확인
    if (req.user) { // 세션에 저장된 유저 id, 로그인 안되어 있음 값 없음
      next()
    } 
    else {
      res.json({success : false})
    } 
  }
module.exports = mw_LoginCheck;