const Store = require('../models/Store');

module.exports = {
  async view(req, res) {
    const user_id = req.user.id;

    try {
      const stores = await Store.findAll({
        where: {
          user_id
        }
      });

      if(!stores){
        return res.status(400).json({ error: 'No stores fond' });
      };

      return res.status(200).json(stores);
      
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Error looking stores, please try later' });
    }
  },

  async crate(req, res) {
    const { name } = req.body;
    const user_id = req.user.id;

    try {
      const store = await Store.create({
        name,
        user_id
      });

      return res.status(201).json(store);

    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Error on try register store, please try later' });
    };
  },

  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.user.id;

    try {
      const store = await Store.findOne({ where: { id } });
      
      if(store.user_id != user_id){
        return res.status(401).json({ error: 'Unauthorized operation' });
      };
      
      await Store.destroy({
        where: { id, user_id }
      });

      return res.status(204);

    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Error on try delete store, please try later' });
    }
  },
}
