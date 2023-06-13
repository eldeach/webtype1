// ======================================================================================== [Import Component] js
const pwFailCount = require('./pwFailCount');


function pwCheck(userID, userPW){
    let correctPW = 'a';
    
    if(userPW===correctPW){
        pwFailCount.zero()
        return true;
    }
    else {
        pwFailCount.up()
        return false;
    }
}

module.exports = pwCheck;