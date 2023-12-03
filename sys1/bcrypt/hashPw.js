// ======================================================================================== [Import Libaray]
// bcrypt & salt 값 정의
const bcrypt = require('bcrypt');
const saltRounds = 1;

async function hashPw(plainPW){
    let hashedPw = await bcrypt.hash(plainPW, saltRounds)
    return hashedPw
}

module.exports = hashPw;