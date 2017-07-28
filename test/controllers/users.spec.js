import request from 'supertest';
import { expect } from 'chai';

import app from '../../app/app';
import models from '../../app/models';

const User = models.User;

describe('GET /users', () => {
  before(() => {
    models.sequelize.sync();
  });

  after(() => {
    User.destroy({ truncate: true });
  });

  it('should get users', (done) => {
    User.create({ nickname: 'test', email: 'test@test.com' }).then(() => {
      request(app)
        .get('/users')
        .expect(200)
        .end((err, res) => {
          expect(res.body.users.length).to.equal(1);
          expect(res.body.users[0].nickname).to.equal('test');
          expect(res.body.users[0].email).to.equal('test@test.com');
          done();
        });
    });
  });
});