// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../../dbconns/maria/thisdb');

async function insertNewApprovald (tblName, sys_code, serviceType, sysName ) {
    let rs = await sendQry(
        `SELECT MAX( CAST( REPLACE( approval_payload_id, 'ap_', '') AS INT)) AS max_no FROM tb_approval_payload_id`  
    )
    let newId = `ap_${parseInt(rs[0].max_no) + 1}`
    console.log(newId)
    let inputRs = await sendQry(
        `INSERT INTO tb_approval_payload_id (approval_payload_id, tbl_name, sys_code, service_type, sys_name) VALUES ('${newId}', '${tblName}', '${sys_code}', '${serviceType}', '${sysName}')`
    )
    return newId;
}

module.exports = insertNewApprovald;