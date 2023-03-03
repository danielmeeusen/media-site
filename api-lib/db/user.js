import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

import normalizeEmail from 'validator/lib/normalizeEmail';
import isEmail from 'validator/lib/isEmail';
import { slugUsername } from '@/api-lib/validators';


export async function throttleLogins(db, ip, login) {
  let logins = await db.collection('logins').findOne({ login });  
  if(logins) {
    if(logins.attempt > 10) {
      return logins;
    }
    let update = {
      attempt: logins.attempt + 1,
    }
    await db.collection('logins').findOneAndUpdate(
      { login },
      { $set: update },
      { returnDocument: 'after' })
      .then(({ value }) => value);
  } else {
    let logins = {
      login,
      ip,
      attempt: 1,
      createdAt: new Date(),
    };
    await db.collection('logins').insertOne({ ...logins });
  }
  return logins;
}

export async function findUserByLoginAndPassword(db, login, password) {
  let user = {};
  if(isEmail(login)) {
    const email = normalizeEmail(login);
    user = await db.collection('users').findOne({ email });
  } else {
    const username = slugUsername(login);
    user = await db.collection('users').findOne({ username })
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const userSessions = await findUserSessions(db, user._id);
    return { ...user, sessions: userSessions.length, password: undefined} // filtered out password
  }
  return null;
}

// If it is for authenticated user, it is okay to expose more fields
export async function UNSAFE_findUserForAuth(db, userId) {
  return db
    .collection('users')
    .findOne(
      { _id:  new ObjectId(userId) },
      {
        projection: { password: 0 },
      }
    )
    .then((user) => user || null);
}

export async function findUserByLogin(db, login) {
  if(isEmail(login)) {
    const email = normalizeEmail(login);
    return db.collection('users').findOne({ email }, { projection: { password: 0 }} || null);
  }
  const username = slugUsername(login);
  return db.collection('users').findOne({ username }, { projection: { password: 0 }} || null);
}

export async function findUserById(db, userId) {
  return db
    .collection('users')
    .findOne({ _id:  new ObjectId(userId) }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

export async function findUserSessions(db, userId) {
  return db
    .collection('sessions')
    .find({ 'session.passport.user': userId })
    .toArray()
    .then((sessions) => sessions || []);
}

export async function findUserByUsername(db, username) {
  return db
    .collection('users')
    .findOne({ username }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

export async function serverSideFindUserByUsername(db, username) {
  return db
    .collection('users')
    .findOne({ username}, {projection: { password: 0 }}) 
    .then((user) => user || null);
}

export async function findUserByEmail(db, email) {
  email = normalizeEmail(email);
  return db
    .collection('users')
    .findOne({ email }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

export async function updateUserById(db, userId, data) {
  return db
    .collection('users')
    .findOneAndUpdate(
      { _id:  new ObjectId(userId) },
      { $set: data },
      { returnDocument: 'after', projection: dbProjectionUsers() }
    )
    .then(({ value }) => value);
}

export async function insertUser( db, { email, originalPassword, username, subscribed, lastChecked }) {
  const password = await bcrypt.hash(originalPassword, 10);
  const user = {
    username,
    email,
    watchlist: [],
    emailVerified: false,
    lastChecked,
    subscribed,
    creator: false,
    promo: false,
    founder: false,
  };
  const { insertedId } = await db.collection('users').insertOne({ ...user, password });
  user._id = insertedId;
  return user;
};

export async function deleteUserById( db, userId ) {
  return db.collection('users').deleteOne({ _id: new ObjectId(userId) });
};

export async function deleteUserSessionById( db, sessionId ) {
  return db.collection('sessions').deleteOne({ _id: sessionId });
};

export async function updateUserPasswordByOldPassword( db, userId, oldPassword, newPassword ) {
  const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
  if (!user) return false;
  const matched = await bcrypt.compare(oldPassword, user.password);
  if (!matched) return false;
  const password = await bcrypt.hash(newPassword, 10);
  await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: { password } });
  return true;
}

export async function UNSAFE_updateUserPassword(db, userId, newPassword) {
  const password = await bcrypt.hash(newPassword, 10);
  await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: { password } });
}

export function dbProjectionUsers(prefix = '') {
  return {
    [`${prefix}password`]: 0,
    [`${prefix}email`]: 0,
    [`${prefix}emailVerified`]: 0,
  };
}
