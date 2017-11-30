import { userInputType, userType } from "../../types/user";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { UserModel as UserModelInterface, default as UserModel } from "../../../models/User";
import jwtStrategy from "../../../auth/jwt-auth";
import * as _ from "lodash";

export default {
    login: {
        type: GraphQLString,
        args: {
            email: {
                name: "email",
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                name: "password",
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: async (root: object, args: any, global) => {
            let response = "Invalid username or password";
            const user = await UserModel.findOne({email: args.email}).exec((err, user: UserModelInterface) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (!user) {
                    return;
                } else if (user.comparePassword(args.password)) {
                    const  token = jwtStrategy.getToken(_.pick(user, [
                        "_id", 
                        "email", 
                        "company", 
                        "profile"
                    ]));
                    global.res.cookie("token", token);
                    response  = "You are now authenticated";
                }
            });
            return response;
        }
    },
    logout: {
        type: GraphQLString,
        args: {
            optionally: {type: GraphQLString}
        },
        resolve: (root, args, context) => {
            if (context.req.cookies && context.req.cookies.token) {
                context.res.clearCookie("token");
                return "Successfully logged out";
            }
            return  "You are not logged in";
        }
    }
};