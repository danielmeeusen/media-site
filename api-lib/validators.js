import slug from 'slug';
import { findUserByEmail, findUserByUsername } from '@/api-lib/db';
import isEmail from 'validator/lib/isEmail';

export const slugUsername = (username) => slug(username, '_');

export async function validateUsername(db, username) {
  let res = { status: 200, message: '' }  

  if (typeof username !== 'string') {
    res.status = 400;
    res.message = "Username must be a string";
  }
  if (username.length < 2) {
    res.status = 400;
    res.message = 'Username must be at least 3 characters';
  }
  if (username.length > 30) {
    res.status = 400;
    res.message = 'Username cannot be longer than 30 characters';
  }
  if (await findUserByUsername(db, username)) {
    res.status = 403;
    res.message = 'Username is already in use';
  }
  return res;
};

export async function validateEmail(db, email, confirmEmail) {
  let res = {status: 200, message: '' };
  
  if (email !== confirmEmail) {
    res.status = 400;
    res.message = 'Emails do not match';
  }
  if (typeof email !== 'string') {
    res.status = 400;
    res.message = 'Email must be a string';
  }
  if (!isEmail(email)) {
    res.status = 400; 
    res.message = 'Invalid Email address';
  }
  if (await findUserByEmail(db, email)) {
    res.status = 403;
    res.message = 'Email is already in use';
  }
  return res;
}

export async function validatePassword(db, newPassword, confirmNewPassword) {
  let res = {status: 200, message: '' };

  if (typeof newPassword !== "string") {
    res.status = 400,
    res.message = 'Password must be a string';
    return res;
  }  
  if (newPassword !== confirmNewPassword) {
    res.status = 400,
    res.message = 'Passwords do not match';
    return res;
  }  
  if (newPassword.length < 8) {
    res.status = 400, 
    res.message = 'Password must be at least 8 characters';
    return res;
  }
  if (newPassword.length > 64) {
    res.status = 400,
    res.message = 'Password must be less than 64 characters';
    return res;
  }
  if (!(/\d/.test(newPassword))) {
    res.status = 400,
    res.message = 'Password must contain at least one number';
    return res;
  }

  return res;
}