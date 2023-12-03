// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../../dbconns/maria/thisdb');
const selectPwCompare = require ('../../dbTransComponent/dbSelect/selectPwCompare')

//Object
const elecSignMsg = require('./elecSignMsg')

async function elecSign (app) {
    app.put('/elecsign', async function (req, res) {
        let pwCompare = await selectPwCompare(req.user, req.body.user_pw)
        if ( req.user !== req.body.user_account) {
            res.status(452).json(elecSignMsg.elecSignFail.notYours)
        } else if ( !pwCompare ) {
            res.status(452).json(elecSignMsg.elecSignFail.wrongPW)
        } else {
            let rs = await sendQry(`
            UPDATE
                tb_approval_payload
            SET
                approval = ${req.body.approval}, approval_date_time = NOW(), user_comment = '${req.body.user_comment}'
            WHERE
                approval_payload_id = '${req.body.approval_payload_id}' AND user_account = '${req.user}'
            `)
            .then((rs) =>{
                res.status(200).json(elecSignMsg.elecSignSuccess)
            })
            .catch((error) => {
                res.status(512).json(elecSignMsg.elecSignFail.dbFail)
            })
        }
    })
}

module.exports = elecSign;