// ======================================================================================== [Import Component] js
// Function
const { sendQry, insertQry } = require ('../../../../dbconns/maria/thisdb');


async function duplicatedCheck ( user_account ) {
    let rs = await sendQry(
        `SELECT * FROM tb_user WHERE user_account = '${user_account}'`
    )

    if ( rs.length > 0 ) {
        return true;
    } else {
        return false;
    }
}

module.exports = duplicatedCheck;