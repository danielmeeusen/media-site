import nc from 'next-connect';
import { nanoid } from 'nanoid';
import geoip from 'geoip-lite';

import { ncOpts } from '@/api-lib/nc';
import { insertUser } from '@/api-lib/db';
import { slugUsername, validateUsername, validateEmail, validatePassword } from '@/api-lib/validators';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { getMongoDb } from '@/api-lib/mongodb';
import { auths } from '@/api-lib/middlewares';

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(
  async (req, res) => {
    const db = await getMongoDb();
    let { username, email, confirmEmail, password, confirmPassword } = req.body;

    let normalEmail = await normalizeEmail(email); 
    let emailRes = await validateEmail(db, email, confirmEmail);

    if (emailRes.status !== 200) {
      res.status(emailRes.status).send(emailRes.message);
      return;
    }
    username = slugUsername(req.body.username);
    let usernameRes = await validateUsername(db, username);
    if (usernameRes.status !== 200) {
      res.status(usernameRes.status).send(usernameRes.message);
      return;
    }    
    let passwordRes = await validatePassword(db, password, confirmPassword);
    if (passwordRes.status !== 200) {
      res.status(passwordRes.status).send(passwordRes.message);
      return;
    }
    const user = await insertUser(db, {
      username,
      email: normalEmail,
      subscribed,
      originalPassword: password,
    });
    req.logIn(user, (err) => {
      if (err) throw err;
      const cid = nanoid(16);
      req.session.cid = cid;
      req.user.cid = cid;
      req.session.displayMode = req.body.displayMode;
      req.session.ua = req.body.ua;
      req.session.ip = process.env.NODE_ENV === 'productions' ? req.body.ip : '76.169.76.173';
      req.session.geo = geoip.lookup(req.session.ip);
      req.session.created = new Date();
      req.session.cookie.secure = process.env.NODE_ENV === 'production' && req.body?.ua.isIos !== true && req.body?.displayMode !== 'standalone';
      res.status(201).json({ user });
    });
  }
);

export default handler;
