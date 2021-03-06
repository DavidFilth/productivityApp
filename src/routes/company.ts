import { CompanyModel, default as Company } from "../models/Company";
import { Router, Response, Request, NextFunction } from "express";
import { UserModel, default as User } from "../models/User";
import { Types } from "mongoose";

class CompanyRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.post("/create", this.postCreateCompany);
        this.router.get("/confirm", this.getConfirmCompany);
        this.router.get("/create", this.getCreateCompany);
    }
    // -------------- GET /company/create -------------- Create company page page.
    getCreateCompany = (req: Request, res: Response) => {
        if (req.user) {
            return res.redirect("/");
        }
        res.render("company/create", {
            title: "Create Company"
        });
    }
    // -------- GET /company/confirm---------- Confirm the newly added company and display the admin credentials.
    getConfirmCompany = (req: Request, res: Response) => {
        res.render("company/confirm", {
            title: "Confirm Data",
            companyName: req.session.data.companyAlias,
            userEmail: req.session.data.userEmail,
        });
    }
    // ------------- POST /company/create ------------- Create a new company in DB.
    postCreateCompany = (req: Request, res: Response, next: NextFunction) => {
        req.assert("email", "Email is not valid").isEmail();
        req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
        req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
        req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

        const errors = req.validationErrors();

        if (errors) {
            req.flash("errors", errors);
            return res.redirect("/company/create");
        }
        const company = new Company({
            name: req.body.name.toLowerCase(),
            alias: req.body.name
        }) as CompanyModel;

        Company.findOne({ name: req.body.name.toLowerCase() }, (err, existingCompany) => {
            if (err) { return next(err); }
            if (existingCompany) {
                req.flash("errors", { msg: "A Company with that name already exists." });
                return res.redirect("/company/create");
            }
            company.save((err: Error) => {
                if (err) { return next(err); }
                User.findOne({ email: req.body.email }, (err, existingUser) => {
                    if (err) { return next(err); }
                    if (existingUser) {
                        req.flash("errors", { msg: `Account with that email address already exists.`});
                        return res.redirect("/company/create");
                    }

                    const user = new User({
                        email: req.body.email,
                        password: req.body.password,
                        companyId: company._id,
                        roleId: Types.ObjectId("59ef66e37cc9844d11a4bceb")
                    }) as UserModel;

                    user.save((err: Error) => {
                        if (err) { return next(err); }
                        req.logIn(user, (err) => {
                            if (err) {
                                return next(err);
                            }
                            // console.log("company= ", company, " || user", user);
                            /* const query = querystring.stringify({
                                "companyId": company._id.toString(),
                                "companyAlias": company.alias,
                                "userId": user._id,
                                "userEmail": user.email,
                                "roleId": user.roleId
                            }); */
                            req.session.data = {
                                "companyId": company._id.toString(),
                                "companyAlias": company.alias,
                                "userId": user._id,
                                "userEmail": user.email,
                                "roleId": user.role
                            };
                            // res.redirect("/company/confirm/?" + query);
                            res.redirect("/company/confirm");
                        });
                    });
                });
            });
        });
    }
}

export default new CompanyRouter();