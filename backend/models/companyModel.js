const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  phone: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date },
  companyName: { type: String, required: true },
  employeeSize: { type: String, required: true },
});

module.exports = mongoose.model("Company", companySchema);
