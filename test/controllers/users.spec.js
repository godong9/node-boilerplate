const request = require("supertest");
const expect = require("chai").expect;

const app = require("../../app/app");
const UserService = require("../../app/services/users");

describe("GET /users", () => {
  before((done) => {
    // given
    UserService.deleteAll()
      .then(UserService.saveUser({ nickname: "test", email: "test@test.com", })
        .then(() => {
          done();
        }));
  });

  it("should success and get users", (done) => {
    // when
    request(app)
      .get("/users")
      .expect(200)
      .end((err, res) => {
        // then
        expect(res.body.data.users.length).to.equal(1);
        expect(res.body.data.users[0].nickname).to.equal("test");
        expect(res.body.data.users[0].email).to.equal("test@test.com");
        done();
      });
  });
});