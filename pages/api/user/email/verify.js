import nc from 'next-connect';

import { ncOpts } from '@/api-lib/nc';
import { createToken } from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { composeEmail } from '@/api-lib/emails';

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(
  ...auths,
  async (req, res) => {
  if (!req.user) {
    res.json(401).send('you need to be authenticated');
    return;
  }
  const db = await getMongoDb();
  const { user } = req;
  // tokens expire after 24 hours
  const token = await createToken(db, {
    creator_id: req.user._id,
    type: 'emailVerify',
    expireAt: new Date(Date.now() + 1000 * 60 * 20),
  });

  const emailOptions = {
    title: 'Are you trying to verify your email address?',
    username: user?.username,
    firstLine: `It looks like you are trying to verify an email linked to an account at: <b>${process.env.WEB_URI}</b>.`,
    clickBelow: `Please click the button below within the next 20 minutes to verify your email address:`,
    link: `${process.env.WEB_URI}/verify-email/${token._id}`,
    button: 'VERIFY EMAIL'
  };

  await sendMail({
    to: req.user.email,
    from: MAIL_CONFIG.from,
    subject: `Verification Email for ${process.env.WEB_URI}`,
    html: composeEmail(emailOptions),
  });

  res.end('ok');
});

export default handler;
