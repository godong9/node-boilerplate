import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from 'config';

const databaseOptions = config.get('database');
const sequelize = new Sequelize(databaseOptions.database, databaseOptions.username, databaseOptions.password, databaseOptions);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;