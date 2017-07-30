import { expect } from 'chai';

import UserService from '../../app/services/users';

describe('UserService.getUsers', () => {
  before((done) => {
    // given
    UserService.deleteAll()
      .then(UserService.saveUser({ nickname: 'test', email: 'test@test.com' }))
      .then(done());
  });

  it('should get user', (done) => {
    done();
  });

  it('should get users', (done) => {
    // when
    UserService.getUsers()
      .then(users => {
        // then
        expect(users.length).to.equal(1);
        expect(users[0].nickname).to.equal('test');
        expect(users[0].email).to.equal('test@test.com');
        done();
      });
  });
});