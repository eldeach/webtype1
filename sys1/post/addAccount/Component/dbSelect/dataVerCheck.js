// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../../../../dbconns/maria/thisdb');

async function dataVerCheck ( user_account ) {

    console.log(user_account)
    let rs = await sendQry(
        `
        SELECT
            MAX(data_ver) AS data_ver,
            MAX(data_sub_ver) AS data_sub_ver,
            user_account
        FROM tb_user AS A
        WHERE A.user_account = '${user_account}' AND A.data_ver = (SELECT MAX(A.data_ver) FROM tb_user AS A WHERE A.user_account = '${user_account}')
        `
    )

    return rs[0]

}

module.exports = dataVerCheck;