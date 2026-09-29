const jwt = require('jsonwebtoken');
const User = require('../models/userSchema.js');

const protect = async (req, res, next) => {
    let  token;
    try {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
      token = authHeader.split(' ')[1]; // Remove 'Bearer ' prefix
     const decoded =  jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password'); // Exclude password from the user object
        next(); // Proceed to the next middleware or route handler
  
}
    catch (error) {
        res.status(401).json({ message: 'Unauthorized token failed' });
    }
    
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized token failed' });
    }
  
};

module.exports = { protect };