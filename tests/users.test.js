const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { sign } = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const userData = {
  name: "Test",
  email: "test@mail.com",
  role: "KASIR",
  password: "test123456",
};

const userDataEdit = {
  name: "TestEdit",
  email: "testedit@mail.com",
  role: "ADMIN",
  password: "test123456",
};

const authUser = {
  name: "AuthUser",
  email: "authuser@mail.com",
  role: "ADMIN",
  password: "test123456",
};

let user;
let token;

beforeAll(async () => {
  const user = await User.create(authUser);
  token = sign(user.toJSON(), SECRET_KEY);
  console.log(token);
});

afterAll(() => {
  return User.destroy({ where: { email: authUser.email } });
});

describe("POST /api/users", () => {
  test("Should be able to save new user", () => {
    return request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send(userData)
      .then((res) => {
        user = res.body.data;
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Data telah disimpan");
        expect(res.body.data.name).toBe("Test");
        expect(res.body.data.email).toBe("test@mail.com");
        expect(res.body.data.role).toBe("KASIR");
      });
  });
});

describe("POST /api/users", () => {
  it("Should fail to save new user", () => {
    return request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
        email: "test",
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
});

describe("GET /api/users", () => {
  it("Should return list of users", () => {
    return request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe("GET /api/users/:id", () => {
  it("Should return single user", () => {
    return request(app)
      .get(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Test");
        expect(res.body.email).toBe("test@mail.com");
        expect(res.body.role).toBe("KASIR");
      });
  });
});

describe("PUT /api/users/:id", () => {
  it("should be able to update user", () => {
    return request(app)
      .put(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(userDataEdit)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Data telah disimpan");
        expect(res.body.data.name).toBe("TestEdit");
        expect(res.body.data.email).toBe("testedit@mail.com");
        expect(res.body.data.role).toBe("ADMIN");
      });
  });
});

describe("DELETE /api/users/:id", () => {
  it("should be able to update user", () => {
    return request(app)
      .delete(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Data telah dihapus");
      });
  });
});
