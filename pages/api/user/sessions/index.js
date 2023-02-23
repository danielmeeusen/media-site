import { findUserSessions, deleteUserSessionById } from '@/api-lib/db';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(
  async (req, res) => {    
    const db = await getMongoDb();
    const userId = req.user?._id;
    const sessions = await findUserSessions(db, userId);
    res.send({ sessions });
  }); 

handler.delete(
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }
    const db = await getMongoDb();

    await deleteUserSessionById(db, req.body?.sessionId);
    
    res.end('ok');
  }
);

export default handler;