
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.BIGINT,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    tableName: 'users',
    timestamps: false,
  });

  return User;
};