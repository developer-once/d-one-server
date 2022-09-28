module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;

  const Project = app.model.define('projects', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(50),
    app_key: STRING(100),
    version: STRING(100),
    address: STRING(400),
    desc: STRING(200),
    type: INTEGER,
    group: STRING(200),
    createdAt: DATE,
    updatedAt: DATE,
  }, {
    freezeTableName: true,
    timestamps: true,
  });

  return Project;
};
