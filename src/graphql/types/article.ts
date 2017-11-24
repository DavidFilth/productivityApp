import companyModel from "../../models/Company";
import ArticleModel from "../../models/Article";
import { companyType } from "./company";
import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList
} from "graphql";

export const articleType = new GraphQLObjectType({
    name: "article",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        company: {
            type: new GraphQLNonNull(companyType),
            resolve: (article) => {
                return companyModel.findById(article.company).exec();
            }
        },
        author: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)}
    })
});

export const articleInputType = new GraphQLInputObjectType({
    name: "articleInput",
    fields: () => ({
        company: {type: GraphQLID},
        author: {type: GraphQLString},
        title: {type: GraphQLString},
        content: {type: GraphQLString}
    })
});