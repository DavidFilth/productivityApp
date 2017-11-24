import { Request, Response, NextFunction, Router } from "express";
import { default as User, UserModel } from "../models/User";
import { WriteError } from "mongodb";

class AccountRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.get("/");
        this.router.post("/profile");
        this.router.post("/password", this.postUpdatePassword);
        this.router.post("/delete", this.postDeleteAccount);
    }
    // ----------------- POST /account/delete -------------Delete user account.
    postDeleteAccount = (req: Request, res: Response, next: NextFunction) => {
        User.remove({ _id: req.user.id }, (err) => {
            if (err) { return next(err); }
            req.logout();
            req.flash("info", {msg: "Your account has been deleted."});
            res.redirect("/");
        });
    }
    // ----------------- POST /account/password------------Update current password.
    postUpdatePassword = (req: Request, res: Response, next: NextFunction) => {
        req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
        req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
        const errors = req.validationErrors();
        if (errors) {
            req.flash("errors", errors);
            return res.redirect("/employee/profile/edit");
        }
        User.findById(req.user.id, (err, user: UserModel) => {
            if (err) { return next(err); }
            user.password = req.body.password;
            user.save((err: WriteError) => {
                if (err) { return next(err); }
                req.flash("success", { msg: "Password has been changed." });
                res.redirect("/employee/profile/edit");
            });
        });
    }
}
export default new AccountRouter();