const { Model, DataTypes } = require('sequelize');

class Type extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING
    }, {
      sequelize: connection,
    });
  };

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'type_id', as: 'Type' });
  };
};

module.exports = Type;