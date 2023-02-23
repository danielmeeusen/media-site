import nc from 'next-connect';

import { ncOpts } from '@/api-lib/nc';
import { epochCancel } from '@/api-lib/db';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(
  ...auths,
  async (req, res) => {

  const db = await getMongoDb();

  const user = await epochCancel(db, req.user);

  res.json({ user });
});

export default handler;

