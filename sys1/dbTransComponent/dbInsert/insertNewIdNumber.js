// ======================================================================================== [Import Component] js
// Function
const { sendQry } = require ('../../../dbconns/maria/thisdb');

async function insertNewIdNumber (idColName, tblName, idKeyword) {
    let rs = await sendQry(
        `SELECT MAX(CAST(REPLACE( ${idColName}, '${idKeyword}', '') AS INT)) AS max_no FROM ${tblName}`

        
    )
    let newId = idKeyword.concat(parseInt(rs[0].max_no) + 1)
    console.log(newId)
    let inputRs = await sendQry(
        `INSERT INTO `.concat(tblName)
        .concat(` (`).concat(idColName).concat(`) `)
        .concat(`VALUES ('`).concat(newId).concat(`')`)
    )
    return newId;
}

module.exports = insertNewIdNumber;