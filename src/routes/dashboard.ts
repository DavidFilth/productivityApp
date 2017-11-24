import { Router, Request, Response, NextFunction } from "express";

class DashboardRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.get("/", this.getDashboard);
    }
    getDashboard(req: Request, res: Response, next: NextFunction) {
        res.render("dashboard/main", {
            title: "Dashboard",
            userEmail: req.cookies.userEmail
        });
    }
}
export default new DashboardRouter();