const pwFailCount = {
    up : function (userID){
        console.log(userID + " fail++")
    },
    zero:function(userID){
        console.log(userID + " fail to zero")
    },
    number:function(userID){
        let failCount=1;
        return failCount;
    }
}

module.exports = pwFailCount;