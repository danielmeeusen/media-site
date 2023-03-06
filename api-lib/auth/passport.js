import { findUserByLoginAndPassword, UNSAFE_findUserForAuth } from '@/api-lib/db';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getMongoDb } from '../mongodb';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

// passport#160
passport.deserializeUser((req, id, done) => {
  getMongoDb().then((db) => {
    UNSAFE_findUserForAuth(db, id).then(
      (user) => done(null, user),
      (err) => done(err)
    );
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'login', passReqToCallback: true },
    async (req, login, password, done) => {   

      const db = await getMongoDb();            
      const user = await findUserByLoginAndPassword(db, login, password);
      
      if (user) done(null, user);
      else done(null, false, { message: 'Login or Password is incorrect' });
    }
  )
);

export default passport;
