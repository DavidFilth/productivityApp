import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import * as cookieParser from "cookie-parser";
import * as errorHandler from "errorhandler";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as mongo from "connect-mongo";
import mongoose = require("mongoose");
import * as express from "express";
import * as logger from "morgan";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import schema from "./graphql";
import * as path from "path";
import * as cors from "cors";

import auth from "./auth";
import { request } from "https";
// ----------- Change the Promise library of mongoose (required in the latest version)
mongoose.Promise = global.Promise;

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
    this.app.set("port", process.env.PORT || 4000);
    this.app.use(compression());
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
    this.app.use(cors());
    // ------------------ Error Handler. Provides full stack - remove for production.
    this.app.use(errorHandler());
    // ------------------ Set the authentication (right now it's only jwt)
    this.app.use(auth);
    this.app.use("/graphql", graphqlExpress( (req, res)  => ({schema, context: {req, res}})));
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