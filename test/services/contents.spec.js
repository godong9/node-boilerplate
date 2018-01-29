const expect = require("chai").expect;
const rewire = require("rewire");

const UserService = require("../../app/services/users");
const ContentService = rewire("../../app/services/contents");

describe("ContentService", () => {
  describe("#getContents", () => {
    before((done) => {
      // given
      ContentService.deleteAll()
        .then(() => UserService.deleteAll())
        .then(() => UserService.saveUser({ nickname: "test", email: "test@test.com", }))
        .then((user) => ContentService.saveContent({ title: "test title", text: "test text", userId: user.id, }))
        .then(() => {
          done();
        });
    });

    it("should get contents", (done) => {
      // when
      ContentService.getContents()
        .then(contents => {
          // then
          expect(contents.length).to.equal(1);
          expect(contents[0].title).to.equal("test title");
          expect(contents[0].text).to.equal("test text");
          expect(contents[0].user.nickname).to.equal("test");
          expect(contents[0].user.email).to.equal("test@test.com");
          done();
        });
    });
  });

  describe("#getContentsByUserId", () => {
    let testUser = null;
    before((done) => {
      // given
      ContentService.deleteAll()
        .then(() => UserService.deleteAll())
        .then(() => UserService.saveUser({ nickname: "test", email: "test@test.com", }))
        .then((user) => {
          testUser = user;
          return ContentService.saveContent({ title: "test title", text: "test text", userId: user.id, });
        })
        .then(() => {
          done();
        });
    });

    it("should get null", (done) => {
      // when
      ContentService.getContentsByUserId(-1)
        .then(contents => {
          // then
          expect(contents.length).to.equal(0);
          done();
        });
    });

    it("should get contents by user id", (done) => {
      // when
      ContentService.getContentsByUserId(testUser.id)
        .then(contents => {
          // then
          expect(contents.length).to.equal(1);
          expect(contents[0].title).to.equal("test title");
          expect(contents[0].text).to.equal("test text");
          expect(contents[0].user.nickname).to.equal("test");
          expect(contents[0].user.email).to.equal("test@test.com");
          done();
        });
    });
  });

  describe("#getContent", () => {
    let testContent = null;

    before((done) => {
      // given
      ContentService.deleteAll()
        .then(() => UserService.deleteAll())
        .then(() => UserService.saveUser({ nickname: "test", email: "test@test.com", }))
        .then((user) => ContentService.saveContent({ title: "test title", text: "test text", userId: user.id, }))
        .then((content) => {
          testContent = content;
          done();
        });
    });

    it("should get content", (done) => {
      // when
      ContentService.getContent(testContent.id)
        .then(content => {
          // then
          expect(content.title).to.equal("test title");
          expect(content.text).to.equal("test text");
          expect(content.user.nickname).to.equal("test");
          expect(content.user.email).to.equal("test@test.com");
          done();
        });
    });
  });

  describe("#_privateTest", () => {
    it("should get test", (done) => {
      const _privateTestFunc = ContentService.__get__("_privateTest");

      // when
      const result = _privateTestFunc();

      // then
      expect(result).to.equal("test");
      done();
    });
  });
});