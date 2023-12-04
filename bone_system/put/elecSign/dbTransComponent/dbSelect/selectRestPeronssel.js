// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../../../../dbconns/maria/thisdb');

async function selectRestPeronssel (approval_payload_id, user_account ) {
    let restPersonnel = await sendQry(`
        SELECT
            *
        FROM
            tb_approval_payload
        WHERE
            approval_payload_id = '${approval_payload_id}' AND approval_type !='RECIEVE' AND approval_date_time is NULL AND user_account != '${user_account}'
    `)
    console.log(restPersonnel)
    return restPersonnel;
}


module.exports = selectRestPeronssel;
