const User = require('../models/User');

const bcrypt = require('bcrypt');

module.exports = {
  async view(req, res) {
    try {
      const user = await User.findAll();

      res.status(200).json(user);

    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Error on looking users, please try later' });
    }
  },

  async create(req, res) {
    const { first_name, last_name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hashSync(password, 7);

      const user = await User.create({
        first_name, 
        last_name, 
        email, 
        password: hashedPassword
      });

      return res.status(201).json(user);
      
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Error on try register user, please try later' });
    }
  }
}
