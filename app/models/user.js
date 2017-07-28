
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
    }
  }, {
    tableName: 'users',
    timestamps: true,
  });

  return User;
};