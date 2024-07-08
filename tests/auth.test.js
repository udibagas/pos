const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

const userData = {
  name: "Kasir",
  email: "kasir@mail.com",
  role: "KASIR",
  password: "test123456",
};

describe("POST /api/login", () => {
  beforeEach(async () => {
    await User.create(userData);
  });

  afterEach(async () => {
    const { email } = userData;
    await User.destroy({ where: { email } });
  });

  it("Should be able to login", () => {
    const { email, password } = userData;
    return request(app)
      .post("/api/login")
      .send({ email, password })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.user).toBeDefined();
      });
  });
});
