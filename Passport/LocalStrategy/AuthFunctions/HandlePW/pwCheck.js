// ======================================================================================== [Import Component] js
const pwFailCount = require('./pwFailCount');


function pwCheck(userID, userPW){
    let correctPW = 'a';
    
    if(userPW===correctPW){
        pwFailCount.zero(userID)
        return true;
    }
    else {
        pwFailCount.up(userID)
        return false;
    }
}

module.exports = pwCheck;