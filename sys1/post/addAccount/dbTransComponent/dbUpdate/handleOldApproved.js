// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../../../../dbconns/maria/thisdb');

async function handleOldApproved(user_account, curretnVer) {
    let rs = await sendQry(`
    UPDATE tb_user
    SET
        approval_status = 'VOID'
    WHERE user_account = '${user_account}' AND approval_status = 'APPROVED' AND data_sub_ver = 0  AND data_ver != ${curretnVer}
    `)
    return rs;
}

module.exports = handleOldApproved;

