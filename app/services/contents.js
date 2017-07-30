import models from '../models';

const Content = models.Content;

const ContentService = {
  getContents: function getContents(params) {
    return Content.findAll(params);
  },
  getContent: function getContent(id) {
    return Content.findById(id);
  },
  saveContent: function saveContent(params) {
    return Content.create(params);
  },
  deleteAll: function deleteAll() {
    return Content.destroy({ truncate: true });
  }
};

module.exports = ContentService;