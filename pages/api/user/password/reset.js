import nc from 'next-connect';
import normalizeEmail from 'validator/lib/normalizeEmail';
import isEmail from 'validator/lib/isEmail';

import { validatePassword } from '@/api-lib/validators';
import {
  createToken,
  findAndDeleteTokenByIdAndType,
  findUserByEmail,
  UNSAFE_updateUserPassword,
} from '@/api-lib/db';
import { composeEmail } from '@/api-lib/emails';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(
  async (req, res) => {
    const db = await getMongoDb();

    if (!isEmail(req.body.email)) {
      res.status(400).send('Email address is invalid');
    }
    const email = normalizeEmail(req.body.email);
    const user = await findUserByEmail(db, email);
    if (!user) {
      res.status(401).send('No account found with that Email');
      return;
    }

    // token expires after 20 minutes
    const token = await createToken(db, {
      creator_id: user._id,
      type: 'passwordReset',
      expireAt: new Date(Date.now() + 1000 * 60 * 20),
    });

    const emailOptions = {
      title: 'Did you forget your password?',
      username: user?.username,
      firstLine: `It looks like you are trying reset your password to: <b>${process.env.WEB_URI}</b>.`,
      clickBelow: `Please click the button below within the next 20 minutes to reset your password:`,
      link: `${process.env.WEB_URI}/recover-password/${token._id}`,
      button: 'RESET PASSWORD'
    };

    await sendMail({
      to: email,
      from: MAIL_CONFIG.from,
      subject: `${process.env.WEB_URI} Reset your password.`,
      html: composeEmail(emailOptions),
    });
    res.end('ok');
  }
);

handler.put(
  async (req, res) => {
    const db = await getMongoDb();

    let { newPassword, confirmNewPassword } = req.body;
    
    let passwordRes = await validatePassword(db, newPassword, confirmNewPassword);

    if (passwordRes.status !== 200) {
      res.status(passwordRes.status).send(passwordRes.message);
      return;
    }
    const deletedToken = await findAndDeleteTokenByIdAndType(
      db,
      req.body.token,
      'passwordReset'
    );
    if (!deletedToken) {
      res.status(403).send('This link may have been expired.');
      return;
    }
    await UNSAFE_updateUserPassword(
      db,
      deletedToken.creator_id,
      req.body.newPassword
    );
    res.end('ok');
  }
);

export default handler;
