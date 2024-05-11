import mongoose from "mongoose";
import env from "dotenv";

env.config();

const connectDB = async () => {
     try{
          await mongoose.connect(process.env.MONGODB_URI || env.MONGODB_URI);
          console.log('Connected to MongoDB');
     }catch(err){
          console.log(`Error encountered while connecting DB: ${err}`);
     }
}

export default connectDB;