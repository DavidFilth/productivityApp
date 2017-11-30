import * as  passport from "passport";
import JWTStrategy from "./jwt-auth";
import User from "../models/User";

const jwtAuthenticate = passport.authenticate("jwt", {session: false});
passport.use(JWTStrategy.createStrategy((jwt_payload, done) => {
    User.findOne({clientNumber: jwt_payload.clientNumber}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(undefined, user);
        } else {
            return done(undefined, false);
        }
    });
}));

export {jwtAuthenticate};
export default passport.initialize();