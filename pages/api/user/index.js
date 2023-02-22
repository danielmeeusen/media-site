import { deleteUserById, findUserByLoginAndPassword, epochCancel } from '@/api-lib/db';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(...auths);

handler.get(
  async (req, res) => {    
  // Filter out password
  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
});

handler.delete(
  ...auths,
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send('unauthenticated');
    }
    const db = await getMongoDb();

    const user = await findUserByLoginAndPassword(db, req.user.email, req.body.password);

    if(user) {
      if(user.epoch.Customer.NextBillDate) {
        const data = await epochCancel(user);
      }
      const deleted = await deleteUserById(db, req.user._id);
      await req.session.destroy();
      res.end('ok');
    } else {
      res.status(401).send('Incorrect Password');
    }
  }
);

export default handler;
