const mariadb = require('mariadb');
const { resolve } = require('path');
const pool = mariadb.createPool({
     host: process.env.THISDB_HOST,
     port: process.env.THISDB_PORT,
     user: process.env.THISDB_USER, 
     password: process.env.THISDB_PW,
     connectionLimit: 5
});

async function getConn(dbName=process.env.THISDB_NAME){
    const conn = await pool.getConnection();
    conn.query('USE ' + dbName);
    return conn;
}

async function selectQry(cols,tblName,whereClause){
    const conn = new getConn();
    const rows = await conn.query('SELECT '+cols+' FROM '+tblName);
    return rows;
}

  async function strFunc (reqQuery) {
    let conn;
    try {
      conn = await pool.getConnection();
      conn.query('USE ' + process.env.THISDB_NAME);
      const rows = await conn.query(reqQuery)
      return rows
    } catch (err) {
      console.log(err)
    } finally {
      if (conn) conn.end();
    }
  }

  async function insertFunc (targetTable, columNamesArr,  questions, valueArrys) {
    let conn;
    try {
      conn = await pool.getConnection();
      conn.query('USE ' + process.env.THISDB_NAME);
      const rows = await conn.query("INSERT INTO " + targetTable + " ("+columNamesArr.join(', ')+") VALUES("+questions.join(', ')+")",valueArrys)
      return rows
    } catch (err) {
      console.log(err)
    } finally {
      if (conn) conn.end();
    }
  }

  async function batchInsertFunc (targetTable, columNamesArr, questions, valueArrys, truncTbl) {
    let conn;
    try {
      conn = await pool.getConnection();
      conn.query('USE ' + process.env.THISDB_NAME);
      if (truncTbl){
        conn.query("SET FOREIGN_KEY_CHECKS = 0;")
        conn.query("TRUNCATE " + targetTable + ";")
        conn.query("SET FOREIGN_KEY_CHECKS = 1;")
      }
      const rows = await conn.batch("INSERT INTO " + targetTable + " ("+columNamesArr.join(', ')+") VALUES("+questions.join(', ')+")", valueArrys)
      return rows
    } catch (err) {
      console.log(err)
    } finally {
      if (conn) conn.end();
    }
  }

  async function batchInsertOnDupliFunc (targetTable, columNamesArr, questions, valueArrys,dupStrArry) {
    let conn;
    try {
      conn = await pool.getConnection();
      conn.query('USE ' + process.env.THISDB_NAME);
      const rows = await conn.batch("INSERT INTO " + targetTable + " ("+columNamesArr.join(', ')+") VALUES("+questions.join(', ')+") ON DUPLICATE KEY UPDATE "+dupStrArry.join(","), valueArrys)
      return rows
    } catch (err) {
      console.log(err)
    } finally {
      if (conn) conn.end();
    }
  }

  async function truncateTable(truncTable){
    let conn;
    try {
      conn = await pool.getConnection();
      conn.query('USE ' + process.env.THISDB_NAME);
      const setFKfalse = await conn.query("SET FOREIGN_KEY_CHECKS = 0;")
      const truncTbl = await conn.query("TRUNCATE " + truncTable + ";")
      const setFKtrue = await conn.query("SET FOREIGN_KEY_CHECKS = 1;")

      // return rows
    } catch (err) {
      console.log(err)
    } finally {
      if (conn) conn.end();
    }
  }

  async function whereClause(targetTable,searchKeyWord){
    let columnList=await strFunc("SHOW COLUMNS FROM "+targetTable)
    let whereList = []
    let clause=""
    if(searchKeyWord.length>0){
      columnList.map((oneColumn)=>{
        let tempStr
        if (oneColumn.Field =="uuid_binary"){
          tempStr= oneColumn.Field + " = UUID_TO_BIN('" + searchKeyWord +"')"
          whereList.push("("+tempStr+")")
        }
        else if(oneColumn.Field =="user_pw"){}
        else if(oneColumn.Field =="insert_by"){}
        else if(oneColumn.Field =="update_by"){}
        else {
          tempStr = oneColumn.Field + " like '%" + searchKeyWord + "%'"
          whereList.push("("+tempStr+")")
        }
        
      })
      clause="WHERE "+whereList.join(" OR ")
    }
    return clause
}

  module.exports={strFunc, insertFunc, batchInsertFunc, batchInsertOnDupliFunc, whereClause, truncateTable}