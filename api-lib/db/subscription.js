import isEmail from 'validator/lib/isEmail';

import { slugUsername } from '@/api-lib/validators';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { fetcher } from '@/lib/fetch';
import { searchApi, cancelApi } from '@/lib/user/utils';

import { insertUser, updateUserById } from '@/api-lib/db';

export async function cancelSubscription(db, user) {  
  let { MemberId } = user?.epoch?.Customer;
  let cancelRes = await fetcher(cancelApi(MemberId));
  
  if(cancelRes?.Response?.Cancel?.Response == 'Success') {
    let searchRes = await fetcher(searchApi('member_id', MemberId));
    const { Customer } = searchRes?.Data[0];

    const updatedUser = await updateUserById(db, user._id, {
      ... ({ epoch: { 
        Customer, 
      }}),
      ... ({ lastChecked: new Date().toJSON() }),
      ... ({ subscribed: user.creator ? true : ((Customer.NextBillDate || Customer.PasswordRemovalDate) < new Date() ? true : false)}),
    });
    return { user: updatedUser };
  } else {
    return cancelRes;
  }
}

export async function epochCheck(db, user) { 
  let data; 
  if(user?.epoch?.Customer?.MemberId) data = await fetcher(searchApi('member_id', user.epoch.Customer.MemberId))
  if(!data?.Data) data = await fetcher(searchApi('email', user.email));
  if(!data?.Data) data = await fetcher(searchApi('username', user.username));
  
  if(data.Data) {
    const { Customer } = data?.Data[0];

    let updatedUser = await updateUserById(db, user._id, {
      ... ( { epoch: { 
        Customer, 
      }}),
      ... ({ lastChecked: new Date().toJSON() }),
      ... ({ subscribed: (Date.parse(Customer.NextBillDate) > new Date()) || (Date.parse(Customer.PasswordRemovalDate) > new Date()) ? true : false }),
    });
    return { user: updatedUser};
  } else {
    let updatedUser = await updateUserById(db, user._id, {
      ... ( { lastChecked: new Date().toJSON() }),
      ... ({ subscribed: false }),
    });
    return { user: updatedUser};
  }
}

export async function epochLogin(db, login, password) {

  const epochConnect = isEmail(login) ? searchApi('email', login) : searchApi('username', login);
  const data = await fetcher(epochConnect);

    if(data.ErrorResponse) {
     return data;
    } else {
      const { Customer } = data?.Data[0];
      if(password === Customer?.Password) {

      const user = await insertUser(db, {
        email: normalizeEmail(Customer.Email),
        username: slugUsername(Customer.Username),
        lastChecked: new Date().toJSON(),
        epoch: {
          Customer
        },
        subscribed: (Customer.NextBillDate || Customer.PasswordRemovalDate < new Date() ? true : false),
        originalPassword: password,
      });
      return user;
    } else {
      return 'match';
    }   
   }
}

export async function epochEmail(email) {
  let data = await fetcher(searchApi('email', email));
  if (data.ErrorResponse) {
    let data = await fetcher(searchApi('email', await normalizeEmail(email)));
    return data;
  }
  return data;
}