// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../dbconns/maria/thisdb');

async function userList (app){
    app.get('/getuserlist', async function(req, res) {
        let rs = await sendQry(
            `
            SELECT
                J.user_account AS user_account,
                J.data_ver AS data_ver,
                J.user_name AS user_name,
                J.user_nickname AS user_nickname,
                J.user_birthday AS user_birthday,
                J.user_gender AS user_gender,
                J.revision_history AS revision_history,
                J.approval_payload AS approval_payload,
                J.user_auth AS user_auth,
                J.user_email AS user_email,
                J.user_phone,
                    CONCAT('[',
                        GROUP_CONCAT(
                            CONCAT('{',
                            CONCAT('"sort_order":"', if(ISNULL(K.sort_order),'',K.sort_order),'",'),
                            CONCAT('"job_position":"', if(ISNULL(K.job_position),'',K.job_position),'",'),
                            CONCAT('"job_team":"', if(ISNULL(K.job_team),'',K.job_team),'",'),
                            CONCAT('"job_company":"', if(ISNULL(K.job_company),'',K.job_company),'",'),
                            CONCAT('"job_description":"', if(ISNULL(K.job_description),'',K.job_description),'"'),
                        '}') SEPARATOR ","),
                    ']') AS user_position
            FROM (
                SELECT 
                    H.user_account AS user_account,
                    H.data_ver AS data_ver,
                    H.user_name AS user_name,
                    H.user_nickname AS user_nickname,
                    H.user_birthday AS user_birthday,
                    H.user_gender AS user_gender,
                    H.revision_history AS revision_history,
                    H.approval_payload AS approval_payload,
                    H.user_auth AS user_auth,
                    H.user_email AS user_email,
                        CONCAT('[',
                            GROUP_CONCAT(
                                CONCAT('{',
                                CONCAT('"sort_order":"', if(ISNULL(I.sort_order),'',I.sort_order),'",'),
                                CONCAT('"phone_number":"', if(ISNULL(I.phone_number),'',I.phone_number),'",'),
                                CONCAT('"phone_usage":"', if(ISNULL(I.phone_usage),'',I.phone_usage),'",'),
                                CONCAT('"phone_affiliation":"', if(ISNULL(I.phone_affiliation),'',I.phone_affiliation),'"'),
                            '}') SEPARATOR ","),
                        ']') AS user_phone,
                    H.user_position_id AS user_position_id
                FROM (
                    SELECT
                        F.user_account AS user_account,
                        F.data_ver AS data_ver,
                        F.user_name AS user_name,
                        F.user_nickname AS user_nickname,
                        F.user_birthday AS user_birthday,
                        F.user_gender AS user_gender,
                        F.revision_history AS revision_history,
                        F.approval_payload AS approval_payload,
                        F.user_auth AS user_auth,
                            CONCAT('[',
                                GROUP_CONCAT(
                                    CONCAT('{',
                                    CONCAT('"sort_order":"', if(ISNULL(G.sort_order),'',G.sort_order),'",'),
                                    CONCAT('"email_address":"', if(ISNULL(G.email_address),'',G.email_address),'",'),
                                    CONCAT('"email_usage":"', if(ISNULL(G.email_usage),'',G.email_usage),'",'),
                                    CONCAT('"email_affiliation":"', if(ISNULL(G.email_affiliation),'',G.email_affiliation),'"'),
                                '}') SEPARATOR ","),
                            ']') AS user_email,
                        F.user_phone_id AS user_phone_id,
                        F.user_position_id AS user_position_id
                    FROM (
                        SELECT
                            C.user_account AS user_account,
                            C.data_ver AS data_ver,
                            C.user_name AS user_name,
                            C.user_nickname AS user_nickname,
                            C.user_birthday AS user_birthday,
                            C.user_gender AS user_gender,
                            C.revision_history AS revision_history,
                            C.approval_payload AS approval_payload,
                                CONCAT('[',
                                    GROUP_CONCAT(
                                        CONCAT('{',
                                        CONCAT('"auth_code":"', if(ISNULL(D.auth_code),'',D.auth_code),'",'),
                                        CONCAT('"system_code":"', if(ISNULL(E.system_code),'',E.system_code),'",'),
                                        CONCAT('"auth_title":"', if(ISNULL(E.auth_title),'',E.auth_title),'",'),
                                        CONCAT('"url_path":"', if(ISNULL(E.url_path),'',E.url_path),'",'),
                                        CONCAT('"auth_description":"', if(ISNULL(E.auth_description),'',E.auth_description),'"'),
                                    '}') SEPARATOR ","),
                                ']') AS user_auth, 
                            C.user_email_id AS user_email_id,
                            C.user_phone_id AS user_phone_id,
                            C.user_position_id AS user_position_id
                        
                        FROM (
                            SELECT
                                A.user_account AS user_account,
                                A.data_ver AS data_ver,
                                A.user_name AS user_name,
                                A.user_nickname AS user_nickname,
                                A.user_birthday AS user_birthday,
                                A.user_gender AS user_gender,
                                A.revision_history AS revision_history,
                                    CONCAT('[',
                                        GROUP_CONCAT(
                                            CONCAT('{',
                                            CONCAT('"approval_order":"', if(ISNULL(B.approval_order),'',B.approval_order),'",'),
                                            CONCAT('"approval_type":"', if(ISNULL(B.approval_type),'',B.approval_type),'",'),
                                            CONCAT('"user_account":"', if(ISNULL(B.user_account),'',B.user_account),'",'),
                                            CONCAT('"user_name":"', if(ISNULL(B.user_name),'',B.user_name),'",'),
                                            CONCAT('"job_team":"', if(ISNULL(B.job_team),'',B.job_team),'",'),
                                            CONCAT('"approval":"', if(ISNULL(B.approval),'',B.approval),'",'),
                                            CONCAT('"approval_date_time":"', if(ISNULL(B.approval_date_time),'',B.approval_date_time),'",'),
                                            CONCAT('"delegated":"', if(ISNULL(B.delegated),'',B.delegated),'",'),
                                            CONCAT('"user_comment":"', if(ISNULL(B.user_comment),'',B.user_comment),'"'),
                                        '}') SEPARATOR ","),
                                    ']') AS approval_payload,
                                A.user_auth_id AS user_auth_id,
                                A.user_email_id AS user_email_id,
                                A.user_phone_id AS user_phone_id,
                                A.user_position_id AS user_position_id
                            FROM
                                tb_user AS A
                                LEFT OUTER JOIN tb_approval_payload AS B ON A.approval_payload_id = B.approval_payload_id
                            WHERE
                                A.approval_status = 'APPROVED'
                            GROUP BY
                                A.user_account
                        ) AS C
                            LEFT OUTER JOIN tb_user_auth AS D ON C.user_auth_id = D.user_auth_id
                            LEFT OUTER JOIN tb_auth_code AS E ON D.auth_code = E.auth_code
                        GROUP BY
                            C.user_account
                    ) AS F
                        LEFT OUTER JOIN tb_user_email AS G ON F.user_email_id = G.user_email_id
                    GROUP BY
                        F.user_account
                ) AS H
                    LEFT OUTER JOIN tb_user_phone AS I ON H.user_phone_id = I.user_phone_id
                GROUP BY
                    H.user_account
            ) AS J
                LEFT OUTER JOIN tb_user_position AS K ON J.user_position_id = K.user_position_id
            GROUP BY
                J.user_account
            `
        )

        res.status(200).json(rs)
    })
}

module.exports = userList;