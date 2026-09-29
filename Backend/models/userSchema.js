const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
    password: { 
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }, 
      isVerified: {
        type: Boolean,
        default: false
    },
    verifyOtp:{
      type: String
    },
    resetPasswordOTP: {
      type: String
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    }
  },  { timestamps: true });

  const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;