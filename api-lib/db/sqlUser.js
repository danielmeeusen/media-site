import { sql_query } from '@/api-lib/middlewares/sqlDatabase';

export async function findMysqlUserByLogin(login) {
  try {
    return await findMysqlUserByUsername(login) || await findMysqlUserByEmail(login);
  } catch (e) {
    return e;
  }
}

export async function findMysqlUserByUsername(username) {
  try {
    const results = await sql_query(
      `
      SELECT * 
      FROM EpochTransStats
      WHERE 
      ets_username = ?
      `, username
    );
    return JSON.parse(JSON.stringify(results));

  } catch (e) {
    return e;
  }
}

export async function findMysqlUserByEmail(email) {
   try {
    const results = await sql_query(
      `
      SELECT * 
      FROM EpochTransStats
      WHERE 
      ets_email = ?
      `, email
    );
    return JSON.parse(JSON.stringify(results));
    
  } catch (e) {
    return e;
  }
}


