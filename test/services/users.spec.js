import { expect } from 'chai';

import UserService from '../../app/services/users';

describe('UserService.getUsers', () => {
  beforeEach(() => {
    UserService.deleteAll();
  });

  it('should get users', (done) => {
    // given
    UserService.saveUser({ nickname: 'test', email: 'test@test.com' })
      // when
      .then(() => UserService.getUsers())
      .then(users => {
        // then
        expect(users.length).to.equal(1);
        expect(users[0].nickname).to.equal('test');
        expect(users[0].email).to.equal('test@test.com');
        done();
      });
  });
});