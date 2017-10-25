import * as supertest from "supertest";
// import * as nock from "nock";

import { default as app } from "../src/server";

// import { ObjectId } from "mongodb";

const request = supertest("http://localhost:3000");

/* const createCompanyInterceptor =
  nock("http://localhost:3000")
    .post("/company/create", {
      name: "Mock Company"
    })
    .reply(200, {
      _id: new ObjectId("11aaa11a111111111aa11111"),
      name: "mock company",
      alias: "Mock Company"
    }); */

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request
      .get("/api")
      .expect(200);
  });
});

describe("GET /api/company?id=59efd78f703166417ce54160", () => {
  it("should find tekmexico", () => {
    return request
      .get("/api/company?id=59efd78f703166417ce54160")
      .then((res) => {
        expect(res.body.name).toBe("tekmexico");
      },
      (err) => err);
  });
});

describe("GET /api/company?name=tekmexico", () => {
  it("should find id=59efd78f703166417ce54160", () => {
    return request
      .get("/api/company?name=tekmexico")
      .then((res) => {
        expect(res.body[0]._id).toBe("59efd78f703166417ce54160");
      },
      (err) => err);
  });
});

/*
describe("POST /api/company/create", () => {
  it("should create a new company in DB.", () => {
    return request
      .post("/api/company/create")
      .then((res) => {
        expect(res.body.name).toBe("mock company1");
      },
      (err) => err);
  });
}); */

describe("POST /api/company/create", () => {
  const data = {
    name: "Mock Company",
    password: "123123",
    confirmPassword: "123123",
    email: "mock@mail.com"
  };
  it("should create a new company in DB.", () => {
    return request
      .post("/api/company/create")
      .send(data)
      .then((res) => {
        expect(res.body.companyAlias).toBe("Mock Company");
      },
      (err) => err);
  });
});
