// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../../dbconns/maria/thisdb');

// Object
const addAccountMsg = require('./addAccountMsg');

//its components
const insertNewApprovald = require('../../dbTransComponent/insert/insertNewApprovald');
const insertNewIdNumber = require('../../dbTransComponent/insert/insertNewIdNumber');
const duplicatedCheck = require('./Component/duplicatedCheck')

async function addAccount ( app ) {
    app.post('/addaccount', async function( req, res ) {
        let duplicatedAccount = await duplicatedCheck(req.body.user_account)
        if ( duplicatedAccount ) {
            res.status(452).json(addAccountMsg.addFail.duplicated)
        } else {
            let approval_status = 'PREPARED'
            if ( req.body.immediate_effective ) {
                approval_status = 'APPROVED'
            }
            let approval_payload_id = await insertNewApprovald('tb_user' )
            let user_email_id = await insertNewIdNumber( 'user_email_id', 'tb_user_email_id', 'uei_' )
            let user_phone_id = await insertNewIdNumber( 'user_phone_id', 'tb_user_phone_id', 'upi_' )
            let user_position_id = await insertNewIdNumber( 'user_position_id', 'tb_user_position_id', 'upi_' )
            let user_auth_id = await insertNewIdNumber( 'user_auth_id', 'tb_user_auth_id', 'uai_' )
            
            let qryStr = `INSERT INTO tb_user (
                uuid_binary,
                data_ver,
                data_sub_ver,
                approval_status,
                remark,
                revision_history,
                approval_payload_id,
                user_account,
                user_pw,
                user_name,
                user_nickname,
                user_birthday,
                user_gender,
                user_email_id,
                user_phone_id,
                user_position_id,
                user_auth_id,
                login_fail_count,
                user_lock,
                password_reset,
                deactivated
            )
            VALUES (
                UUID_TO_BIN(UUID()),
                1,
                0,
                '${approval_status}',
                NULL,
                NULL,
                '${approval_payload_id}',
                '${req.body.user_account}',
                '${req.body.user_pw}',
                '${req.body.user_name}',
                '${req.body.user_nickname}',
                '${req.body.user_birthday}',
                '${req.body.user_gender}',
                '${user_email_id}',
                '${user_phone_id}',
                '${user_position_id}',
                '${user_auth_id}',
                0,
                0,
                0,
                0
            )`.replace(/\n/g, "")

            await sendQry(qryStr)
            .then ((rs) => {
                res.status(200).json(addAccountMsg.addSuccess)
            })
            .catch ( (error) => {
                res.status(512).json(addAccountMsg.addFail.dbFail)
            })
        }
    })
}

module.exports = addAccount;