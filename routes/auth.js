const rout = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const router = rout.Router(); 

//Register User

router.post('/register', async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            isAdmin: req.body.isAdmin
        });
        const user = await newUser.save();
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err);
    }
})

// Login User

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Validate the password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.KEY);
  
      res.json({token,  message: 'Logged in successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post('/logout', (req, res) => {
   // Clear the token from client-side
   res.json({ message: 'Logged out successfully' });
});

module.exports = router