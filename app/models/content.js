
module.exports = function(sequelize, DataTypes) {
  const Content = sequelize.define('Content', {
    id: {
      type: DataTypes.BIGINT,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      field: 'title',
    },
    text: {
      type: DataTypes.STRING,
      field: 'text',
    },
  }, {
    tableName: 'users',
      timestamps: true,
  });

  Content.associate = function(models) {
    Content.belongsTo(models.User, {
      as: 'content'
    });
  };

  return Content;
};