import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema({
     prefs:{
          type: [String],
          required: true,
     },
     username:{
          type: mongoose.Schema.Types.String,
          ref: 'Users'
     },
},{timestamps: true});

const Prefs = mongoose.model('Prefs', preferenceSchema);

export default Prefs;