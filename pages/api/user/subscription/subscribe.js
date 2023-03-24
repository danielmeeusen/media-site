import nc from 'next-connect';

import { ncOpts } from '@/api-lib/nc';
import { auths } from '@/api-lib/middlewares';
import { subscribeLink } from '@/api-lib/db'

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(
  ...auths,
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send('unauthenticated');
    }
    const link = await subscribeLink(req.user);
    
    const subLink = { link }

    res.send(subLink);
});

export default handler;
