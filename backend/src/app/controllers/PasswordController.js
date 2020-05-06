const User = require('../models/User');

const bcrypt = require('bcrypt');

module.exports = {
  async forgot(req, res) {
    const { email, password, newPassword } = req.body;
    const user_id = req.user.id;

    try {

      const user = await User.findOne({
        where: { email, id: user_id },
      });

      if(!user){
        return res.status(400).json({ error: 'Unregistered user' });
      };

      if(user.id != user_id){
        return res.status(400).json({ error: 'Unauthorized operation' });
      };

      const verifyPassword = bcrypt.compareSync(password, user.password);

      if(!verifyPassword){
        return res.status(400).json({ error: 'Incorrect password' });
      };

      const encryptedPassword = bcrypt.hashSync(newPassword, 7);

      const updatedUser = await User.update({
        password: encryptedPassword,
      }, {
        where: { email, id: user_id }
      });

      return res.status(200).json(updatedUser);

    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Error on try forgot password' });
    }
  }
};