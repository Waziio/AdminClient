import passport from "passport";
import passportJWT from "passport-jwt";
import User from "../models/user.js";

passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "cleSecrete",
    },
    (jwtPayload, done) => {
      return User.findByPk(jwtPayload.id)
        .then((user) => {
          return done(null, user);
        })
        .catch((error) => {
          return done(error);
        });
    }
  )
);
