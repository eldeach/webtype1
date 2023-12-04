// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../../../../dbconns/maria/thisdb');

async function selectPreparedType (approval_payload_id) {
    let rs = await sendQry(`
        SELECT * FROM tb_approval_payload_id WHERE approval_payload_id = '${approval_payload_id}'
    `)
    console.log(rs[0])
    return rs[0]
}

module.exports = selectPreparedType;