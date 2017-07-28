import request from 'supertest';
import { expect } from 'chai';

import app from '../../app/app';

describe('GET /', () => {
  it('should respond with text message "index page"', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.equal('index page');
        done();
      });
  });
});