import nc from 'next-connect';

import { findUserById } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const user = await findUserById(db, req.query.userId);
  res.send({ user });
});

export default handler;
