const express = require('express');
const User = require('../models/userSchema.js');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { model } = require('mongoose');

const generteToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d',
  });
}

const register = async (req, res) => {
  // Registration logic here
  try{
  const { name, email, password } = req.body;
  if(!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.status(400).json({ message: 'User already exists' });    
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await  bcrypt.hashSync(password, salt); 

    const user = await User.create({ name, email, password: hashedPassword })
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyOtp = otp;
       await user.save();

const message = `Welcome to ShoppingBaazi, ${name}!

Thank you for registering on our platform.

Your one-time verification/discount OTP is: ${otp}`;

await sendEmail({
    email: user.email,
    subject: 'Email Verification OTP',
    text: message
  });


    res.status(201).json({ 
         _id: user._id,
         name: user.name,
         email: user.email, 
         role: user.role,
         otp: user.verifyOtp,
         token: generteToken(user._id),
        message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


const login = async (req, res) => {
  // Login logic here
  try { 
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,    
        email: user.email,
        role: user.role,
        token: generteToken(user._id),
      });
    }   
    else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
} 
catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}


const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}   

const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email});
    if(!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if(user.verifyOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.verifyOtp = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// const logout = async (req, res) => {  
//   const USER = await Product.findOne(user.token);

// }

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if(!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail({
      email: user.email,
      subject: 'Your Password Reset Code',
      text: `Your verification code is ${otp}. It expires in 10 minutes.`
    });

    res.status(200).json({ message: 'Verification code sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if(!user.resetPasswordOTP || !user.resetPasswordExpires) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    if(user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: 'Code has expired' });
    }

    if(user.resetPasswordOTP !== otp) {
      return res.status(400).json({ message: 'Incorrect code' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordOTP = undefined;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    res.status(200).json({ message: 'Code verified', resetToken });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;
    if(!email || !resetToken || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if(!user.resetPasswordToken || !user.resetPasswordExpires) {
      return res.status(400).json({ message: 'Invalid or expired reset session' });
    }

    if(user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: 'Reset session has expired' });
    }

    if(user.resetPasswordToken !== resetToken) {
      return res.status(400).json({ message: 'Invalid reset token' });
    }

    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hashSync(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = {
  register,
  login,
  getUsers,
  verifyEmail,
  forgotPassword,
  verifyResetOtp,
  resetPassword
};