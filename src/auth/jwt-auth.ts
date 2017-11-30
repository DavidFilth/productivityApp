import { ExtractJwt, Strategy, StrategyOptions, VerifyCallback } from "passport-jwt";
import { PassportStatic } from "passport";
import * as jwt from "jsonwebtoken";
import User from "../models/User";

class JWTStrategy {
    private options: StrategyOptions;
    constructor() {
        this.options = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        };
    }
    public createStrategy(cb: VerifyCallback) {
        return new Strategy(this.options, cb);
    }
    public getToken(user) {
        return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: process.env.JWT_TOKENEXPIRATIONTIME});
    }
    public getUser(token: string) {
        return jwt.decode(token);
    }
}
export default new JWTStrategy();