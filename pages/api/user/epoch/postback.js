import nc from 'next-connect';

import { ncOpts } from '@/api-lib/nc';
import { epochCheck, epochLogin, findUserByLogin, updateUserById } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';

import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { composeEmail } from '@/api-lib/emails';


const handler = nc(ncOpts);

handler.post(
  async (req, res) => {
    const db = await getMongoDb();

    const body = await JSON.parse(decodeURIComponent(JSON.stringify(req.body)));
       
    let user;
    user = await findUserByLogin(db, body.email);    
    if(!user) {
      user = await findUserByLogin(db, body.username);
    }

    if(user){
      user = await updateUserById(db, user._id, {
        ...{ epoch: { Customer: { MemberId: body.member_id } } },
      });
    }
      
    let epoch;

    if(user) {
      epoch = await epochCheck(db, user);
    } else {
      user = await epochLogin(db, body.email, body.password);
    }

    const emailOptions = {
      title: 'postback confirm',
      username: user?.username,
      firstLine: `A PostBack just occured for: ${user?.email}`,
      clickBelow: `Subscribed: ${user?.subscribed}.  Click below for details:`,
      link: `https://epoch.com/services/customer_search/index.json?auth_user=${process.env.EPOCH_AUTH}&auth_pass=${process.env.EPOCH_PASS}&api_action=search&member_id=${body.member_id}`,
      button: 'VERIFY POSTBACK'
    };
  
    await sendMail({
      to: 'fetishkitsch@gmail.com',
      from: MAIL_CONFIG.from,
      subject: `postback confirm`,
      html: composeEmail(emailOptions),
    });
    
    res.end('ok');
});

export default handler;
