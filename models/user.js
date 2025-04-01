const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const user = new mongoose.Schema({
    
    username:{
      type: String,
      unique: true,
      required: [true, 'User must have a username']
    },
    email: {
        type: String, 
        unique: true,
        required: [true, 'User must have a email']
      },
    password: {
        type: String,
        required: [true, 'User must have a password']
    },
    created_at: {
       type: Date,
       default: Date.now()
    },
    updated_at:{
       type: Date,
       default: Date.now()
    }
});

user.pre('save', async function (next) {
  if (!this.password)
    throw Error('Please provide password');

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

user.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', user);

module.exports = User;