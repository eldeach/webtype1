// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../../../dbconns/maria/thisdb');

async function mwAuthCheck (req, res, next) {
    if ( req.user ) {
        let rs = await sendQry("select a.user_auth_id as user_auth_id, b.auth_code as auth_code, b.url_path as url_path from (select tb_user_auth.user_auth_id, tb_user_auth.auth_code from tb_user left outer join tb_user_auth on tb_user.user_auth_id = tb_user_auth.user_auth_id where user_account='".concat(req.user).concat("') as a left outer join tb_auth_code as b on a.auth_code = b.auth_code where b.url_path = '").concat(req.originalUrl).concat("'"));
        if (rs.length > 0) {
            next()
          } else {
            res.redirect('/noauth')
          }
    } else {
        res.clearCookie('connect.sid');
        res.redirect('/sessionexpired')
    }
}
module.exports = mwAuthCheck;