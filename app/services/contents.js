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
  getContent: function getContent(id) {
    const params = Object.assign({}, commonOptions);
    return Content.findById(id, params);
  },
  saveContent: function saveContent(params) {
    return Content.create(params);
  },
  deleteAll: function deleteAll() {
    return Content.destroy({ truncate: true });
  }
};

module.exports = ContentService;