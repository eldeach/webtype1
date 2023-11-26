const {sendQry, selectQry, insertQry, updateQry, batchInsertFunc, batchInsertOnDupliFunc, whereClause, truncateTable} = require ('../../../dbconns/maria/thisdb');

async function userExist(userID){
    let rs = await sendQry(selectQry({
        cols : ["*"],
        tblName : "tb_user",
        whereClause : "user_account = '".concat(userID).concat("'")
      }));

    let countAccount = rs.length;

    if (countAccount === 1) {
        if (rs[0].user_lock === 0) {
            return 2;
        } else {
            return 1;
        }
    } else {
        return false;
    }
}

module.exports = userExist;