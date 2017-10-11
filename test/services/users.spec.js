import { expect } from "chai";

import UserService from "../../app/services/users";

describe("UserService.getUsers", () => {
  before((done) => {
    // given
    UserService.deleteAll()
      .then(() => UserService.saveUser({ nickname: "test1", email: "test1@test.com" }))
      .then(() => UserService.saveUser({ nickname: "test2", email: "test2@test.com" }))
      .then(() => done());
  });

  it("should get all users", (done) => {
    // when
    const params = { order: [["nickname", "DESC"]] };
    UserService.getUsers(params)
      .then(users => {
        // then
        expect(users.length).to.equal(2);
        done();
      });
  });

  it("should get test1 user", (done) => {
    // when
    const params = { where: { nickname: "test1" } };
    UserService.getUsers(params)
      .then(users => {
        // then
        expect(users.length).to.equal(1);
        expect(users[0].nickname).to.equal("test1");
        expect(users[0].email).to.equal("test1@test.com");
        done();
      });
  });

  it("should get all users order by nickname desc", (done) => {
    // when
    const params = { order: [["nickname", "DESC"]] };
    UserService.getUsers(params)
      .then(users => {
        // then
        expect(users.length).to.equal(2);
        expect(users[0].nickname).to.equal("test2");
        expect(users[0].email).to.equal("test2@test.com");
        expect(users[1].nickname).to.equal("test1");
        expect(users[1].email).to.equal("test1@test.com");
        done();
      });
  });
});

describe("UserService.getUser", () => {
  let testUser = null;

  before((done) => {
    // given
    UserService.deleteAll()
      .then(() => UserService.saveUser({ nickname: "test", email: "test@test.com" }))
      .then(function (user) {
        testUser = user;
        done();
      });
  });

  it("should get user", (done) => {
    // when
    UserService.getUser(testUser.id)
      .then(user => {
        // then
        expect(user.nickname).to.equal("test");
        expect(user.email).to.equal("test@test.com");
        done();
      });
  });
});

