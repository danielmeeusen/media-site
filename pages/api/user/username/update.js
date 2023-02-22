import nc from 'next-connect';

import { ncOpts } from '@/api-lib/nc';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { updateUserById } from '@/api-lib/db';
import { slugUsername, validateUsername } from '@/api-lib/validators';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { composeEmail } from '@/api-lib/emails';

const handler = nc(ncOpts);

handler.use(...auths);

handler.patch(
  async (req, res) => {
    const db = await getMongoDb();

    let { username } = req.body;

    username = slugUsername(req.body.username);

    let response = await validateUsername(db, username);

    if (response.status !== 200) {
      res.status(response.status).send(response.message);
      return;
    }

    const emailOptions = {
      title: 'Did you just change your username?',
      username: req.user.username,
      firstLine: `It looks like someone just changed your username for: <b>${process.env.WEB_URI}</b>, from <b>${req.user.username}</b> to <b>${username}</b>.`,
      clickBelow: `If this was not you please follow the link below to change your username and/or password:`,
      link: `${process.env.WEB_URI}/settings`,
      button: 'CHANGE ACCOUNT SETTINGS'
    };
    
    await sendMail({
      to: req.user.email,
      from: MAIL_CONFIG.from,
      subject: `Username change for ${process.env.WEB_URI}`,
      html: composeEmail(emailOptions),
    });

    const user = await updateUserById(db, req.user._id, {
      ...(username && { username })
    });

    res.json({ user });
  }
);

export default handler;
