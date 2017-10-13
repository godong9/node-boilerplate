import models from "../models";

const Content = models.Content;

const commonOptions = {
  include: [
    {
      association: "user",
    },
  ],
};

const ContentService = {
  getContents: function getContents(params) {
    const modelParams = Object.assign({}, params, commonOptions);
    return Content.findAll(modelParams);
  },
  getContentsByUserId: function getContents(userId) {
    const modelParams = Object.assign({}, commonOptions);
    modelParams.include[0].where = { id: userId, };
    return Content.findAll(modelParams);
  },
  getContent: function getContent(id) {
    const options = Object.assign({}, commonOptions);
    return Content.findById(id, options);
  },
  saveContent: function saveContent(params) {
    const modelParams = Object.assign({}, params);
    return Content.create(modelParams);
  },
  deleteAll: function deleteAll() {
    return Content.destroy({ truncate: true, });
  },
};

export default ContentService;
