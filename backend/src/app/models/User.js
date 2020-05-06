const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init({
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize: connection,
    });
  };

  static associate(models) {
    this.hasMany(models.Store, { foreignKey: 'user_id', as: 'Store' });
  };
};

module.exports = User;
