import nc from 'next-connect';

import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { ncOpts } from '@/api-lib/nc';

const handler = nc(ncOpts);

handler.post(async (req, res) => {

  await sendMail({
    to: process.env.EMAIL,
    from: MAIL_CONFIG.from,
    replyTo: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
  });
  res.end('ok');
});

export default handler;
