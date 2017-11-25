import { GraphQLScalarType, GraphQLError, Kind } from "graphql";

export const DateType = new GraphQLScalarType({
    name: "Date",
    description: "Date objects are based on a time value that is the number of milliseconds since January 1st, 1970 UTC.",
    serialize(value) {
        if (!(value instanceof Date)) {
            throw new TypeError("The given value is not an instance of Date");
        }
        if (isNaN(value.getTime())) {
            throw new TypeError("The given value is not a valid Date");
        }
        return value.toJSON();
    },
    parseValue(value) {
        if (typeof value !== "string" ) {
            throw new TypeError("The given value is not an instance of string");
        }
        return parseDate(value);
    },
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError("It can only parse strings to dates but got a " + ast.kind);
        }
        try {
            return parseDate(ast.value);
        } catch (e) {
            throw new GraphQLError(e);
        }
    }
});

function parseDate(value: string) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
        throw new TypeError("Invalid date:" + date);
    }
    if (value !== date.toJSON()) {
        throw new TypeError("Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ: " + value);
    }
    return date;
}