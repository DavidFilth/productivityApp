import { Request, Response, NextFunction } from "express";

/**
 * GET /dashboard
 * Display the dashboard
 */
export let getDashboard = (req: Request, res: Response) => {
    console.log("Cookies:", req.cookies.userEmail);
    res.render("dashboard/main", {
        title: "Dashboard",
        userEmail: req.cookies.userEmail
    });
};