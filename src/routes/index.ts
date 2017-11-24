import { Router, Request, Response, NextFunction } from "express";
import dashboardRouter from "./dashboard";
import employeeRouter from "./employee";
import accountRouter from "./account";
import companyRouter from "./company";
import userRouter from "./user";
import apiRouter from "./api";

class MainRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.use("/dashboard", dashboardRouter.router);
        this.router.use("/employee", employeeRouter.router);
        this.router.use("/account", accountRouter.router);
        this.router.use("/company", companyRouter.router);
        this.router.use("/api/v1", apiRouter.router);
        this.router.use("/", userRouter.router);
        this.router.get("/", this.home);
    }
    home(req: Request, res: Response, next: NextFunction) {
        res.render("home", {
            title: "Home"
        });
    }
}
export default new MainRouter().router;