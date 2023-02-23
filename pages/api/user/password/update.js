import nc from 'next-connect';

import { validatePassword } from '@/api-lib/validators';
import { updateUserPasswordByOldPassword } from '@/api-lib/db';
import { auths } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { composeEmail } from '@/api-lib/emails';

const handler = nc(ncOpts);

handler.use(...auths);

handler.patch(
  async (req, res) => {
    const db = await getMongoDb();
    
    if (!req.user) {
      res.json(401).send('you need to be authenticated');
      return;
    }
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (oldPassword === newPassword) {
      res.status(400).send('New Password must be different than current password');
      return;
    }
    let passwordRes = await validatePassword(db, newPassword, confirmNewPassword);
    if (passwordRes.status !== 200) {
      res.status(passwordRes.status).send(passwordRes.message);
      return;
    }

    const emailOptions = {
      title: 'Did you just change your password?',
      username: req.user.username,
      firstLine: `It looks like someone just changed your password for: <b>${process.env.WEB_URI}</b>,`,
      clickBelow: `If this was not you please follow the link below to change your password:`,
      link: `${process.env.WEB_URI}/settings`,
      button: 'CHANGE ACCOUNT SETTINGS'
    };
    
    await sendMail({
      to: req.user.email,
      from: MAIL_CONFIG.from,
      subject: `Password change for ${process.env.WEB_URI}`,
      html: composeEmail(emailOptions),
    });

    const success = await updateUserPasswordByOldPassword(
      db,
      req.user._id,
      oldPassword,
      newPassword
    );
    if (!success) {
      res.status(401).send('The password you have entered is incorrect.');
      return;
    }
    res.end('ok');
  }
);

export default handler;
