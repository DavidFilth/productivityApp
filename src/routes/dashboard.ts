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
            user: {
                profile: {
                    firstName: "David",
                    lastName: "Sanchez"
                },
                company: {
                    name: "Tekmexico"
                },
                notifications: [{}, {}],
                teams: [
                    {members: [{}, {}, {}]},
                    {members: [{}, {}, {}]}
                ]
            },
            activities: [
                {
                    content: "Suspendisse ante lectus, vestibulum malesuada urna et, aliquam fermentum tortor. Morbi pretium non arcu sit amet ultrices. Suspendisse laoreet odio velit, eu consectetur arcu vestibulum nec. Proin mollis tincidunt dolor et lobortis. Nunc semper purus non risus lobortis vulputate. Vestibulum lorem sapien, sodales ut consequat id, tristique nec quam. Pellentesque tincidunt neque tellus, vitae consequat magna mattis quis.",
                    project: { name: "HR Project"},
                    dueAt: new Date().toLocaleString(),
                    users: [{}, {}, {}]
                },
                {
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit enim vitae justo condimentum, et volutpat tellus viverra. Curabitur in ipsum eu erat vulputate maximus ac sit amet urna. Donec euismod mattis tortor, ut tincidunt nisi consectetur a. Praesent non nulla elit. Duis dapibus dolor id rhoncus porta. Fusce efficitur, enim sed vestibulum accumsan, neque velit venenatis ipsum, eget euismod arcu nibh vel magna.",
                    project: { name: "Productivity App"},
                    dueAt: new Date().toLocaleString(),
                    users: [{}, {}]
                },
            ],
            articles: [
                {
                    author: "Francisco",
                    title: "Test Environment",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit enim vitae justo condimentum, et volutpat tellus viverra. Curabitur in ipsum eu erat vulputate maximus ac sit amet urna. Donec euismod mattis tortor, ut tincidunt nisi consectetur a. Praesent non nulla elit. Duis dapibus dolor id rhoncus porta. Fusce efficitur, enim sed vestibulum accumsan, neque velit venenatis ipsum, eget euismod arcu nibh vel magna."
                },
                {
                    author: "David",
                    title: "GraphQL Mutations",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit enim vitae justo condimentum, et volutpat tellus viverra. Curabitur in ipsum eu erat vulputate maximus ac sit amet urna. Donec euismod mattis tortor, ut tincidunt nisi consectetur a. Praesent non nulla elit. Duis dapibus dolor id rhoncus porta. Fusce efficitur, enim sed vestibulum accumsan, neque velit venenatis ipsum, eget euismod arcu nibh vel magna."
                }
            ],
            vacancies: [
                {
                    name: "Developer",
                    location: "Anaheim",
                    company: {name: "Sibatel"}
                },
                {
                    name: "Debugger",
                    location: "Tijuana",
                    company: {name: "Tekmexico"}
                }
            ]
        });
    }
}
export default new DashboardRouter();