import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

// Register a new user

const register = async function(req, res, next) {
     const { username, email, password } = req.body;

     try {
          // check for existing username
          const existedUserName = await User.findOne({username});
          if(existedUserName) {
               res.status(401).json({message: 'UserName is already taken. Use another one.'});
          }
          // check for existing emailid
          const existedEmailId = await User.findOne({email});
          if(existedEmailId) {
               res.status(401).json({message: 'Email is already taken. Use another one.'});
          }
          // salt rounds for encryption
          const saltRounds = await bcrypt.genSalt(10);
          // hash the password, salt = 10
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          
          const user = new User({
               username, email, password: hashedPassword
          });
          await user.save();
          res.json({message: 'Registration successful'});
     }catch(e){
          next(e);
     }
}

const login = async function(req, res, next)  {
     const {username, password} = req.body;

     try{
          const user = await User.findOne({username});
          
          if(!user){
               return res.status(404).json({message: 'User not found'});
          }
          const passwordMatch = await user.comparePassword(password);
          if(!passwordMatch) {
               return res.status(401).json({message: 'Incorrect password'});
          }

          const token = jwt.sign({userId: user._id, username: user.username}, process.env.SECRET_KEY,{
               expiresIn: '2 days'
          });
          res.json({token: `${token}`});
     }catch(e){
          next(e);
     }
}

export {register, login}