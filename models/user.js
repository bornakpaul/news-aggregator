import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
     username:{
          type: String,
          required: true,
          unique: true,
     },
     email:{
          type: String,
          required: true,
          unique: true,
     },
     password:{
          type: String,
          required: true,
     }
},{timestamps: true});

// before every registration  check
userSchema.pre('save',async function(next){
     const user = this;
     if(user.isModified('password')) return next();
     try{
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, salt);
          next();
     }catch(err){
          console.log(err);
          next(err);
     }
});

// compare the hashed password from that of DB
userSchema.methods.comparePassword = async function(password){
     return bcrypt.compare(password, this.password);
}

const User = mongoose.model('Users',userSchema);

export default User;