const User = require('../models/User');
const generateToken = require('../functions/generateToken');
const bcrypt = require('bcrypt');

module.exports = {
  async create(req, res) {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ where: { email } });

      if(!user) {
        return res.status(400).json({ error: 'Unregistered user' });
      };

      verifyPassword = await bcrypt.compareSync(password, user.password);

      if(!verifyPassword) {
        return res.status(400).json({ error: 'Invalid password' });
      };

      user.password = undefined;

      const token = generateToken(user);

      console.info('User logged');
      return res.status(201).json({ user, token });

    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Error logging in, please try later' });
    };
  },
};