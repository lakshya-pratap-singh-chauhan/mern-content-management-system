const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY='secretkey';
exports.register = async (req, res) => {
  let { name,username, password } = req.body;
  username = username.toLowerCase();
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the username is a valid email
  try {
    if (!emailRegex.test(username)) {
    console.log('check');
    return res.status(422).json({ msg: 'Invalid email format' });
  }
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(422).json({ msg: 'User already exists' });
    }

    user = new User({ name,username, password });
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, SECRET_KEY , { expiresIn: '1hr' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  let { username, password } = req.body;
  username = username.toLowerCase();

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(422).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({ msg: 'Invalid credentials' });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: '1hr' });
    
    res.status(200).send({
        token: token,
        id: user.id,
        name: user.name,
        success: true,
    })

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
