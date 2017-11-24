import { CompanyModel, default as Company } from "../models/Company";
import { Router, Request, Response, NextFunction } from "express";
import { RoleModel, default as Role } from "../models/Role";
import { UserModel, default as User } from "../models/User";
import { ObjectId, WriteError } from "mongodb";

class EmployeeRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.post("/profile/edit", this.postUpdateProfile);
        this.router.get("/profile/edit", this.getAccount);
        this.router.post("/create", this.postSignup);
        this.router.get("/create", this.getSignup);
    }
    // ------------- GET /employee/create ------------- Create employee form page.
    getSignup = (req: Request, res: Response) => {
        let currentCompany: CompanyModel;
        Company.findById(new ObjectId(req.cookies.companyId), (err, company) => {
            if (err) { return err; }
            currentCompany = company as CompanyModel;
            Role.find({ "companyId": new ObjectId(req.cookies.companyId) }, (err, roles) => {
                if (err) return err;
                res.render("employee/create", {
                title: "Create Employee",
                availableRoles: roles,
                userCompany: currentCompany.alias
                });
            });
        });
    }
    // ------------ POST /employee/create -------------- Create a new employee in the system.
    postSignup = (req: Request, res: Response, next: NextFunction) => {
        req.assert("email", "Email is not valid").isEmail();
        req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
        req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
        req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
        const errors = req.validationErrors();
        if (errors) {
            req.flash("errors", errors);
            return res.redirect("/employee/create");
        }
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            roleId: req.body.role,
            companyId: req.session.data.companyId,
            profile: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }
        }) as UserModel;
        User.findOne({ email: req.body.email }, (err, existingUser) => {
            if (err) { return next(err); }
            if (existingUser) {
                req.flash("errors", { msg: "Employee with that email address already exists." });
                return res.redirect("/employee/create");
            }
            user.save((err) => {
                if (err) { return next(err); }
                res.redirect("/dashboard");
            });
        });
    }
    // ----------------- GET /account ----------------- Profile page.
    getAccount = (req: Request, res: Response) => {
        res.render("employee/profile/edit", {
            title: "Account Management"
        });
    }
    // ----------------- POST /account/profile ----------- Update profile information.
    postUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
        req.assert("email", "Please enter a valid email address.").isEmail();
        req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
        const errors = req.validationErrors();
        if (errors) {
            req.flash("errors", errors);
            return res.redirect("/employee/profile/edit");
        }
        User.findById(req.user.id, (err, user: UserModel) => {
            if (err) { return next(err); }
            user.email = req.body.email || "";
            user.profile.firstName = req.body.firstName || "";
            user.profile.lastName = req.body.lastName || "";
            user.profile.gender = req.body.gender || "";
            user.profile.location = req.body.location || "";
            user.profile.portfolio = req.body.portfolio || "";
            user.save((err: WriteError) => {
                if (err) {
                    if (err.code === 11000) {
                        req.flash("errors", { msg: `The email address you have entered is already associated with an account.` });
                        return res.redirect("/employee/profile/edit");
                    }
                    return next(err);
                }
                req.flash("success", { msg: "Profile information has been updated." });
                res.redirect("/employee/profile/edit");
            });
        });
    };
}

export default new EmployeeRouter();