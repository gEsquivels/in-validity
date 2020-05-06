const { Model, DataTypes } = require('sequelize');

class Store extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize: connection,
    });
  };

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
    //this.hasMany(models.Product, { foreignKey: 'store_id', as: 'Product' });
  };
};

module.exports = Store;
