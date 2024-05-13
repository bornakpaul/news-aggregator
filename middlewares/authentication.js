import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authentication = async function(req, res, next) {
     const token = req.headers.authorization?.split(' ')[1];

     if(!token){
          return res.status(401).json({message: 'Authentication required, token missing'});
     }

     try{
          const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
          const user = await User.findById(decodedToken.userId);
          req.username = user.username;
          console.log(`check username: ${user.username}`);
          next();
     }catch(e){
          res.status(401).json({message: `Token error ${e}`});
     }
};

export default authentication ;