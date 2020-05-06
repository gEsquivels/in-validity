const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      validity: DataTypes.DATE,
      price: DataTypes.REAL,
      status: DataTypes.STRING,
      lot: DataTypes.STRING
    }, {
      sequelize: connection,
    });
  };

  static associate(models) {
    this.belongsTo(models.Store, { foreignKey: 'store_id', as: 'Store' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
    this.belongsTo(models.Type, { foreignKey: 'type_id', as: 'Type' });
  };
};

module.exports = Product;
