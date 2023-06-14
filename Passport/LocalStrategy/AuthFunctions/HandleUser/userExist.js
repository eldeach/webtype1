function userExist(userID){
    let countAccount = 1;

    if (userID=="ad") countAccount = 1;
    else countAccount =0 ;

    if (countAccount === 1) {
        return true
    }
    else if(countAccount < 1){
        return false
    }
    

}

module.exports = userExist;