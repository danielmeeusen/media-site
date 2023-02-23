import nc from 'next-connect';

import { getAutocomplete, searchTags } from '@/api-lib/db';
import { ncOpts } from '@/api-lib/nc';
import { getMongoDb } from '@/api-lib/mongodb';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const data = await searchTags(db, req.query.keywords);

  res.send(data);
});

export default handler;