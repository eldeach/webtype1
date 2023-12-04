// ======================================================================================== [Import Libaray]
//bcrypt
const bcrypt = require('bcrypt'); // bcrypt 라이브러리 

// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../../dbconns/maria/thisdb');


async function selectPwCompare (userAccount, userPW){
    let rs = await sendQry(`
        SELECT user_account, user_pw FROM tb_user WHERE approval_status = 'APPROVED' AND user_account = '${userAccount}'
    `)
    return bcrypt.compareSync( userPW, rs[0].user_pw )
}

module.exports = selectPwCompare;