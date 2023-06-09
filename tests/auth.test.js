const request = require("supertest");
const express = require("express");
const routes = require("../routes");
const app = express();

app.use(express.json());
app.use("/api/users", routes);

describe("Authentication", () => {
  it("should create a new agent", async () => {
    const res = await request(app)
      .post("/api/users/create-agent")
      .send({
        status: "success",
        data: {
          token: "jajdajdiadnaaojiajk23krjk23rk29084nj43ij",
        },
        message: "Agent created",
      });
    // expect(res.statusCode).toEqual(200);
  });

  it("should agent signin", async () => {
    const res = await request(app)
      .post("/api/users/signin-agent")
      .send({
        status: "success",
        data: {
          token: "jajdajdiadnaaojiajk23krjk23rk29084nj43ij",
        },
        message: "Agent signin successfully",
      });
    expect(res.statusCode).toEqual(200);
  });

  it("should update the agent data", async () => {
    const res = await request(app)
      .post("/api/users/update-agent/1")
      .send({
        status: "success",
        data: {
          token: "jajdajdiadnaaojiajk23krjk23rk29084nj43ij",
        },
        message: "Agent updated",
      });
    // expect(res.statusCode).toEqual(200);
  });

  it("should delete the agent", async () => {
    const res = await request(app).post("/api/users/delete-agent/1").send({
      status: "success",
      data: {},
      message: "Agent deleted",
    });
    // expect(res.statusCode).toEqual(200);
  });

  it("should agent profile", async () => {
    const res = await request(app)
      .post("/api/users/agent-profile/1")
      .send({
        status: "success",
        data: {
          name: "mg mg",
        },
        message: "Agent profile",
      });
    // expect(res.statusCode).toEqual(200);
  });

  it("should init route", async () => {
    const res = await request(app)
      .post("/api/users/init")
      .send({
        status: "success",
        data: {
          token: "jajdajdiadnaaojiajk23krjk23rk29084nj43ij",
        },
        message: "Found member",
      });
    expect(res.statusCode).toEqual(200);
  });
});
