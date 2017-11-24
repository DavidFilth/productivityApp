import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import expressValidator = require("express-validator");
import * as cookieParser from "cookie-parser";
import * as errorHandler from "errorhandler";
import * as compression from "compression";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as mongo from "connect-mongo";
import * as flash from "express-flash";
import mongoose = require("mongoose");
import * as passport from "passport";
import * as express from "express";
import * as logger from "morgan";
import * as dotenv from "dotenv";
import * as lusca from "lusca";
import schema from "./graphql";
import router from "./routes";
import * as path from "path";

const MongoStore = mongo(session);
mongoose.Promise = global.Promise;

// ----------- Load environment variables from .env file, where API keys and passwords are configured.
dotenv.config({ path: ".env" });

// ----------- Create Express server.
class Server {
  private app: express.Application;
  constructor() {
    this.app = express();
    this.connectToDB();
    this.config();
  }
  config() {
    // ------------------- Express configuration.-----------------------
    this.app.set("port", process.env.PORT || 3000);
    this.app.set("views", path.join(__dirname, "../views"));
    this.app.set("view engine", "pug");
    this.app.use(compression());
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(expressValidator());
    this.app.use(session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      store: new MongoStore({
        url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
        autoReconnect: true
      })
    }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(flash());
    this.app.use(lusca.xframe("SAMEORIGIN"));
    this.app.use(lusca.xssProtection(true));
    this.app.use((req, res, next) => {
      res.locals.user = req.user;
      next();
    });
    this.app.use((req, res, next) => {
      // After successful login, redirect back to the intended page
      if (!req.user &&
        req.path !== "/login" &&
        req.path !== "/signup" &&
        !req.path.match(/^\/auth/) &&
        !req.path.match(/\./)) {
        // req.session.returnTo = req.path;
        req.session.returnTo = "/dashboard";
      } else if (req.user &&
        req.path == "/account") {
        req.session.returnTo = req.path;
      }
      next();
    });
    this.app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
    // Error Handler. Provides full stack - remove for production.
    this.app.use(errorHandler());
    this.app.use(router);
    this.app.use("/graphql", graphqlExpress({schema}));
    this.app.use("/graphiql", graphiqlExpress({endpointURL: "/graphql"}));
  }
  // --------------- Connect to MongoDB.-------------------------------
  connectToDB() {
    return mongoose.connect(
      process.env.MONGODB_URI || process.env.MONGOLAB_URI,
      {useMongoClient: true},
      (err: mongoose.Error) => {
        if (err) {
          console.log("MongoDB connection error. Please make sure MongoDB is running.");
          process.exit();
        } else {
          console.log("Successfully connected to mongodb");
        }
      }
    );
  }
  // ------------------ Start Express server.----------------------------
  startServer() {
    return this.app.listen(this.app.get("port"), () => {
      console.log(`App is running at http://localhost:${this.app.get("port")} in ${this.app.get("env")} mode`);
    });  
  }
}

export default new Server().startServer();