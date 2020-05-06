const moment = require('moment');

const Product = require('../models/Product');

module.exports = {
  async view(req, res) {
    const user_id = req.user.id;

    try {
      const products = await Product.findAll({
        where: { user_id },
        include: 'Store'
      });

      if(!products){
        return res.status(400).json({ error: 'No products fond' });
      };

      return res.status(200).json(products);

    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Error looking for products, please try later' });
    }
  },

  async create(req, res) {
    const { name, description, validity, price, status, lot, type_id, store_id } = req.body;
    const user_id = req.user.id;

    const formatedValidity = moment(`${validity}`, 'DD/MM/YYYY').format('YYYY-MM-DD');

    try {
      const product = await Product.create({
        name,
        description,
        validity: formatedValidity,
        price,
        status,
        lot,
        type_id,
        store_id,
        user_id
      });

      return res.status(201).json(product);

    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Error on register product, please try later' });
    }
  },

  async update(req, res) {
    const data = req.body;
    const { id } = req.params;
    const user_id = req.user.id;

    try {

      const product = await Product.findOne({ where: { id} });
      
      if(product.user_id != user_id){
        return res.status(400).json({ error: 'Unauthorized operation' });
      };

      await Product.update(data, { 
        where: { id, user_id } 
      });

      return res.status(204);

    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;

    try {
      const product = await Product.findOne({ where: { id } });
      
      if(product.user_id != user_id){
        return res.status(400).json({ error: 'Unauthorized operation' });
      };

      await Product.destroy({
        where: { id, user_id }
      });

      return res.status(204);
      
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Error on try dalete, please try later' });
    }
  },
}
