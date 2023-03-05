import nc from 'next-connect';
import requestIp from 'request-ip'
import geoip from 'geoip-lite';
import { nanoid } from 'nanoid';

import { passport } from '@/api-lib/auth';

import { ncOpts } from '@/api-lib/nc';
import { getMongoDb } from '@/api-lib/mongodb';
import { auths } from '@/api-lib/middlewares';
import { throttleLogins } from '@/api-lib/db'

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(
  async (req, res, next) => {
    const db = await getMongoDb();

    let clientIp = requestIp.getClientIp(req); 

    if(clientIp == '::1') clientIp = '75.82.58.187';
    req.body.ip = clientIp;

    const loginCount = await throttleLogins(db, clientIp, req.body.login);
    
    if(loginCount && loginCount?.attempt > 20) {
      res.status(429).send('Too many login attempts');
      return;
    }
    const authFunc = await passport.authenticate('local');
    authFunc(req, res, next);
},
(req, res) =>{
  const cid = nanoid(16);
  req.session.cid = cid;
  req.user.cid = cid;
  req.session.displayMode = req.body.displayMode;
  req.session.ua = req.body.ua;
  req.session.ip = req.body.ip;
  req.session.geo = geoip.lookup(req.session.ip);
  req.session.created = new Date();
  req.session.cookie.secure = process.env.NODE_ENV === 'production' && req.body?.ua.isIos !== true && req.body?.displayMode !== 'standalone';
  res.json({ user: req.user });
});

handler.delete(async (req, res) => {
  await req.session.destroy();
  res.status(204).end();
});

export default handler;
