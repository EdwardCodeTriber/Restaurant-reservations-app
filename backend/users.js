// import mongoose from "mongoose";
// import validator from "validator";
// import bcrypt from 'bcrypt'

// const userSchema= mongoose.Schema({
//     email:{
//         type:String, required:true, unique:true, validate:[validator.isEmail, 'Please enter a valid email']
//     },
//     password:{
//         type:String, required:true, validator:function(value){
//             return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
//         }
//     },
//     name: { type: String, required: true },
//     role: {
//         type: String,
//         enum: ['user', 'admin'],
//         default: 'user'
//     }
    
// }, { timestamps: true });

// userSchema.pre('save', async function(next){
//     if(!this.isModified('password'))
//         return next();
//     this.password= await bcrypt.hash(this.password,12);
//     next();
// })

// export default mongoose.model("Users", userSchema)
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    
    default: 'USER'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);