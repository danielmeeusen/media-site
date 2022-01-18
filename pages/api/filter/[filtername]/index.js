import { getFilter } from '@/api-lib/db';
import { all, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(all);

handler.get(async (req, res) => {
  const filter = await getFilter(req.db, req.query.filtername);
  res.send({ filter });
});

export default handler;