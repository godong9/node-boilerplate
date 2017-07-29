import request from 'supertest';
import { expect } from 'chai';

import app from '../../app/app';
import UserService from '../../app/services/users';

describe('GET /users', () => {
  beforeEach(() => {
    UserService.deleteAll();
  });

  it('should success and get users', (done) => {
    // given
    UserService.saveUser({ nickname: 'test', email: 'test@test.com' }).then(() => {
      // when
      request(app)
        .get('/users')
        .expect(200)
        .end((err, res) => {
          // then
          expect(res.body.users.length).to.equal(1);
          expect(res.body.users[0].nickname).to.equal('test');
          expect(res.body.users[0].email).to.equal('test@test.com');
          done();
        });
    });
  });
});