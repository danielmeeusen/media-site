import nc from 'next-connect';

import { findSite } from '@/api-lib/db';
import { ncOpts } from '@/api-lib/nc';
import { getMongoDb } from '@/api-lib/mongodb';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const site = await findSite(db);

  res.send({ site });
});

export default handler;