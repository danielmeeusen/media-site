import nc from 'next-connect';

import { getTags, insertTag, deleteTag, getTag } from '@/api-lib/db';
import { ncOpts } from '@/api-lib/nc';
import { getMongoDb } from '@/api-lib/mongodb';
import { auths } from '@/api-lib/middlewares';

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  if(req.query.type !== undefined){
    const tag = await getTags(db, req.query.type);
    res.send(tag);
  }

  if(req.query.name !== undefined) {
    const tag = await getTag(db, req.query.name);
    res.send(tag);
  }
});

handler.post(
  ...auths,
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send('unauthenticated');
    }
    if (typeof req.body.name == 'string' ) {
      const db = await getMongoDb();
      const tag = await insertTag(db, req.body);
      return res.json({ tag });
    }
    return res.status(400).send('input was not a string') 
});

handler.delete(
  ...auths,
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send('unauthenticated');
    }
    const db = await getMongoDb();

    const tag = await deleteTag(db, req.body);
    
    return res.json({ tag });
});

export default handler;