

// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../../dbconns/maria/thisdb');

// Object
const addAccountMsg = require('./addAccountMsg');

// external components
const hashPw = require ('../../bcrypt/hashPw')

//its components
const insertNewApprovald = require('../../dbTransComponent/dbInsert/insertNewApprovald');
const insertNewIdNumber = require('../../dbTransComponent/dbInsert/insertNewIdNumber');

// its components - dbSelect
const dataVerCheck = require('./dbTransComponent/dbSelect/dataVerCheck')
const duplicatedCheck = require('./dbTransComponent/dbSelect/duplicatedCheck')

// its components - dbInsert
const insertDetailedEmail = require('./dbTransComponent/dbInsert/insertDetailedEmail')
const insertDetailedPhone = require('./dbTransComponent/dbInsert/insertDetailedPhone')
const insertDetailedPosition = require('./dbTransComponent/dbInsert/insertDetailedPosition')

//its components - dbUpdate
const handleOldApproved = require('./dbTransComponent/dbUpdate/handleOldApproved')

async function addAccount ( app ) {
    app.post('/addaccount', async function( req, res ) {

        let max_data_ver = await dataVerCheck(req.body.user_account)
        let data_ver = 0;
        let data_sub_ver = 0;

        if ( req.body.immediate_effective ) {
            if ( !max_data_ver.data_ver ) {
                data_ver += 1
                data_sub_ver = 0
            } else {
                data_ver = max_data_ver.data_ver + 1;
                data_sub_ver = 0;
            }

        } else {
            if ( !max_data_ver.data_ver ) {
                data_ver = 0;
                data_sub_ver = 1;
            } else {
                data_ver = max_data_ver.data_ver;
                data_sub_ver = max_data_ver.data_sub_ver + 1;
            }
        }

        let hashedPw = await hashPw(req.body.user_pw)

        let duplicatedAccount = await duplicatedCheck(req.body.user_account)
        if ( duplicatedAccount && req.body.add_type === "NEW") {
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

            let rsDetailedEmail = await insertDetailedEmail( user_email_id, req.body.user_email )
            let rsDetailedPhone = await insertDetailedPhone( user_phone_id, req.body.user_phone )
            let rsDetailedPosition = await insertDetailedPosition( user_position_id, req.body.user_position )

            console.log("rsDetailedEmail " + rsDetailedEmail)
            console.log("rsDetailedPhone " + rsDetailedPhone)
            console.log("rsDetailedPosition " + rsDetailedPosition)
            
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
                ${data_ver},
                ${data_sub_ver},
                '${approval_status}',
                NULL,
                NULL,
                '${approval_payload_id}',
                '${req.body.user_account}',
                '${hashedPw}',
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
            .then ( async (rs) => {
                let handleAppRs = await handleOldApproved(req.body.user_account, data_ver)
                console.log(handleAppRs)
                res.status(200).json(addAccountMsg.addSuccess)
            })
            .catch ( (error) => {
                res.status(512).json(addAccountMsg.addFail.dbFail)
            })
        }
    })
}

module.exports = addAccount;