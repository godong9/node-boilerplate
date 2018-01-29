const request = require("supertest");
const expect = require("chai").expect;

const app = require("../../app/app");

describe("GET /", () => {
  it("should respond with text message 'index page'", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.exist;
        done();
      });
  });
});