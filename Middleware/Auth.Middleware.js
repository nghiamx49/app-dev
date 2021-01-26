const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const db = require("../Migrations/db.Connection");
const User = db.users;

const cookieExtractToken = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access-token"];
    return token;
  }
};
//auth
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractToken,
      secretOrKey: "TAM-Application",
    },
    (paypload, done) => {
      User.findById({ _id: paypload.subject }, (err, user) => {
        if (err) {
          return done(err, false);
        } else if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);
//auth local strategy by using username and compare password
passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        //handle error
        return done(err);
      }
      if (!user) {
        //if no user matched
        return done(null, false);
      }
      //check if password is wrong/right
      user.comparePassword(password, done);
    });
  })
);
