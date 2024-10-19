const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/companyModel");
const sendEmail = require("../utils/sendEmail");
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

exports.registerCompany = async (req, res) => {
  const { name, email, password, phone, companyName, employeeSize } = req.body;
  try {
    let company = await Company.findOne({ email });
    if (company) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    company = new Company({
      name,
      email,
      password: hashedPassword,
      phone,
      otp,
      otpExpires,
      companyName,
      employeeSize,
    });

    await company.save();

    // Send OTP to email
    await sendEmail(
      email,
      "Verify your email",
      `Your OTP is ${otp}. It will expire in 10 minutes.`
    );

    res
      .status(201)
      .json({ message: "OTP sent to your email. Please verify your email." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res.status(400).json({ message: "Company not found" });
    }

    if (company.isVerified) {
      return res.status(400).json({ message: "Account is already verified" });
    }

    if (company.otp !== otp || company.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Verify account
    company.isVerified = true;
    company.otp = undefined;
    company.otpExpires = undefined;
    await company.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company || !company.isVerified) {
      return res
        .status(401)
        .json({ message: "Invalid credentials or unverified account" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.status(200).json({ message: "User Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
