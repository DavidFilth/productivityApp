"use strict";

import * as async from "async";
import * as request from "request";
import * as graph from "fbgraph";
import { Response, Request, NextFunction } from "express";

import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import { default as User, UserModel, AuthToken } from "../models/User";
import { default as Role, RoleModel } from "../models/Role";
import { default as Company, CompanyModel } from "../models/Company";


/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  res.status(200).render("api/index", {
    title: "API Examples"
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
export let getFacebook = (req: Request, res: Response, next: NextFunction) => {
  const token = req.user.tokens.find((token: any) => token.kind === "facebook");
  graph.setAccessToken(token.accessToken);
  graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err: Error, results: graph.FacebookUser) => {
    if (err) { return next(err); }
    res.render("api/facebook", {
      title: "Facebook API",
      profile: results
    });
  });
};

/**
 * GET /api/company
 * Endpoint to check if the request has an ID or a name to query
 */
export let getCompanyData = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.id) {
    return getCompanyDataById(req, res, next);
  } else if (req.query.name) {
    return getCompanyDataByName(req, res, next);
  }
};

/**
 * GET /api/company?id
 * Endpoint to get data from the Company Collection by ID
 */
export let getCompanyDataById = (req: Request, res: Response, next: NextFunction) => {
  const companyId = req.query.id;
  Company.findById(new ObjectId(companyId), (err, company) => {
    if (err) return err;
    res.json(company);
  });
};

/**
 * GET /api/company?name
 * Endpoint to get data from the Company Collection by name
 */
export let getCompanyDataByName = (req: Request, res: Response, next: NextFunction) => {
  const companyName = req.query.name;
  Company.find({ name: companyName }, (err, company) => {
    if (err) return err;
    res.status(200).json(company);
  });
};


/**
 * POST /company/create
 * Create a new company in DB.
 */
export let postCreateCompany = (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
  req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.status(500).json({ "error": errors });
  }
  const company = new Company({
    name: req.body.name.toLowerCase(),
    alias: req.body.name
  }) as CompanyModel;

  Company.findOne({ name: req.body.name.toLowerCase() }, (err, existingCompany) => {
    if (err) { return next(err); }
    if (existingCompany) {
      req.flash("errors", { msg: "A Company with that name already exists." });
      return res.status(500).json({ msg: "A Company with that name already exists." });
    }
    company.save((err: Error) => {
      if (err) { return next(err); }
      User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) { return next(err); }
        if (existingUser) {
          req.flash("errors", { msg: "Account with that email address already exists." });
          return res.status(500).json({ msg: "Account with that email address already exists." });
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
            req.session.data = {
              "companyId": company._id.toString(),
              "companyAlias": company.alias,
              "userId": user._id,
              "userEmail": user.email,
              "roleId": user.roleId
            };
            return res.status(200).json(req.session.data);
          });
        });
      });
    });
  });
};