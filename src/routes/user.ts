import { Router, Response, Request, NextFunction } from "express";
import { UserModel, default as User } from "../models/User";
import { LocalStrategyInfo } from "passport-local";
import * as passport from "passport";

class UserRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.post("/login", this.postLogin);
        this.router.get("/login", this.getLogin);
        this.router.get("/logout", this.logout);
        this.router.post("/signup");
        this.router.get("/signup");
    }
    // ---------------GET /login ------------ Login page.
    getLogin (req: Request, res: Response) {
        if (req.user) {
            return res.redirect("/");
        }
        res.render("account/login", {
            title: "Login"
        });
    }
    // ------------- GET /logout ------------ Log out.
    logout(req: Request, res: Response) {
        const cookie = req.cookies;
        for (const prop in cookie) {
            if (!cookie.hasOwnProperty(prop)) {
                continue;
            }
            res.cookie(prop, "", { expires: new Date(0) });
        }
        req.logout();
        res.redirect("/");
    }
    // -------------- POST /login ---------------- Sign in using email and password.
    postLogin(req: Request, res: Response, next: NextFunction) {
        req.assert("email", "Email is not valid").isEmail();
        req.assert("password", "Password cannot be blank").notEmpty();
        req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
        const errors = req.validationErrors();
        if (errors) {
            req.flash("errors", errors);
            return res.redirect("/login");
        }
        passport.authenticate("local", (err: Error, user: UserModel, info: LocalStrategyInfo) => {
            if (err) { return next(err); }
            if (!user) {
                req.flash("errors", info);
                return res.redirect("/login");
            }
            req.logIn(user, (err) => {
                if (err) { return next(err); }
                req.flash("success", { msg: "Success! You are logged in." });

                req.session.data = {
                    "userId": user._id,
                    "userEmail": user.email,
                    "roleId": user.role,
                    "companyId": user.company
                };
                res.setHeader(
                    "Set-Cookie", 
                    [
                        `companyId=${user.company}`, 
                        `userId=${user._id}`, `userEmail=${user.email}`, 
                        `roleId=${user.role}`
                    ]
                );
                res.redirect(req.session.returnTo || "/");
            });
        })(req, res, next);
    }  
}

export default new UserRouter();