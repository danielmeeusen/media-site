import nc from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';

import { ncOpts } from '@/api-lib/nc';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { updateUserById, findUserByEmail } from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { composeEmail } from '@/api-lib/emails';


const handler = nc(ncOpts);

handler.use(...auths);

handler.patch(
  ...auths,
  async (req, res) => {
    const db = await getMongoDb();

    let { email } = req.body;

    if ( typeof email !== 'string') {
      res.status(400).send('All entries must be strings');
      return;
    }
    email = normalizeEmail(req.body.email);

    if (!isEmail(email)) {
      res.status(400).send('The email you entered is invalid.');
      return;
    }
    if (await findUserByEmail(db, email)) {
      res.status(403).send('Email is already in use.');
      return;
    }
    
    const emailOptions = {
      title: 'Did you just change your email address?',
      username: req.user.username,
      firstLine: `It looks like someone just changed your email address for <b>${process.env.WEB_URI}</b> to ${email}.`,
      clickBelow: `If this was not you please follow the link below to change your email and/or password:`,
      link: `${process.env.WEB_URI}/settings`,
      button: 'CHANGE ACCOUNT SETTINGS'
    };
    
    await sendMail({
      to: req.user.email,
      from: MAIL_CONFIG.from,
      subject: `Email change for ${process.env.WEB_URI}`,
      html: composeEmail(emailOptions),
    });
    
    const user = await updateUserById(db, req.user._id, {
      emailVerified: false,
      ...(email && { email })
    });

    res.json({ user });
  }
);

export default handler;
