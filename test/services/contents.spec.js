import { expect } from 'chai';

import UserService from '../../app/services/users';
import ContentService from '../../app/services/contents';

describe('ContentService.getContents', () => {
  function saveAndGetUser() {
    return new Promise((resolve, reject) => {
      UserService.saveUser({ nickname: 'test', email: 'test@test.com' })
        .then((user) => resolve(user))
        .catch(err => reject(err));
    });
  }

  before((done) => {
    // given
    ContentService.deleteAll()
      .then(UserService.deleteAll())
      .then(saveAndGetUser()
        .then(function(user) {
          ContentService.saveContent({ title: 'test title', text: 'test text', userId: user.id })
            .then(done())
        })
      );
  });

  it('should get contents', (done) => {
    // when
    ContentService.getContents()
      .then(contents => {
        // then
        expect(contents.length).to.equal(1);
        expect(contents[0].title).to.equal('test title');
        expect(contents[0].text).to.equal('test text');
        // expect(contents[0].user.length).to.equal(1);
        // expect(contents[0].user.nickname).to.equal('test');
        // expect(contents[0].user.email).to.equal('test@test.com');
        done();
      });
  });
});