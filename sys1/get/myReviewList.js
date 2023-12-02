// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../dbconns/maria/thisdb');

async function myReviewList (app){
    app.get('/getmyreviewlist', async function(req, res) {
        let rs = await sendQry(
            `
            SELECT
                A.approval_payload_id AS approval_payload_id,
                C.tbl_name AS tbl_name,
                CONCAT('"', A.approval_order, '"') AS approval_order,
                CONCAT('"', if(ISNULL(B.max_done_approval_order),'',B.max_done_approval_order), '"') AS max_done_approval_order,
                CONCAT('"', ( A.approval_order = 0 ) OR ((A.approval_order-1) = B.max_done_approval_order) , '"') AS my_turn,
                A.approval_type AS approval_type,
                A.user_account AS user_account,
                CONCAT('"', if(ISNULL(A.user_name),'',A.user_name), '"') AS user_name,
                CONCAT('"', if(ISNULL(A.job_team),'',A.job_team), '"') AS job_team,
                CONCAT('"', if(ISNULL(A.delegated),'',A.delegated), '"') AS delegated
                
            FROM
                tb_approval_payload AS A
                LEFT OUTER JOIN (SELECT approval_payload_id, MAX(approval_order) AS max_done_approval_order FROM tb_approval_payload WHERE approval IS TRUE GROUP BY approval_payload_id) AS B
                ON A.approval_payload_id = B.approval_payload_id
                LEFT OUTER JOIN tb_approval_payload_id AS C ON A.approval_payload_id = C.approval_payload_id
            
            WHERE A.user_account = '${req.user}' AND (A.approval IS FALSE OR A.approval IS NULL)
            `.replace(/\n/g, "")
        )
        res.status(200).json(rs)
    })
}

module.exports = myReviewList;