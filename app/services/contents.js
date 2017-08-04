import models from '../models';

const Content = models.Content;

const commonOptions = {
  include: [
    {
      association: 'user',
    }
  ]
};

const ContentService = {
  getContents: function getContents(params) {
    params = Object.assign({}, params, commonOptions);
    return Content.findAll(params);
  },
  getContentsByUserId: function getContents(userId) {
    const params = Object.assign({}, params, commonOptions);
    params.include[0].where = { id: userId };
    return Content.findAll(params);
  },
  getContent: function getContent(id) {
    const options = Object.assign({}, commonOptions);
    return Content.findById(id, options);
  },
  saveContent: function saveContent(params) {
    params = Object.assign({}, params);
    return Content.create(params);
  },
  deleteAll: function deleteAll() {
    return Content.destroy({ truncate: true });
  }
};

module.exports = ContentService;