import mysql from 'serverless-mysql';

export const mysqlDB = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT
  },
})

export async function sql_query(query_string, values = []) {
  try {
    const results = await mysqlDB.query(query_string, values)
    await mysqlDB.end()
    console.log(results);
    return results
  } catch (e) {
    throw Error(e.message)
  }
}