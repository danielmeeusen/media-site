import { findPeople } from '@/api-lib/db';
import { all, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(all);

handler.get(async (req, res) => {
  const people = await findPeople(req.db);
  res.send({ people });
});

export default handler;