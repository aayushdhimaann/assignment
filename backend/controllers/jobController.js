const Company = require("../models/companyModel");
const Job = require("../models/jobModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

exports.postJob = async (req, res) => {
  const {
    jobTitle,
    jobDescription,
    experienceLevel,
    endDate,
    candidateEmails,
  } = req.body;

  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the company using decoded token info
    const company = await Company.findById(decoded.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Create and save the job
    const job = new Job({
      title: jobTitle,
      description: jobDescription,
      experienceLevel,
      endDate,
      company: company._id,
    });
    await job.save();

    // Construct email content
    const emailContent = `
      <p>Dear Candidate,</p>
      <p>We are pleased to invite you to apply for the following job:</p>
      <ul>
        <li><strong>Job Title:</strong> ${jobTitle || "N/A"}</li>
        <li><strong>Job Description:</strong> ${jobDescription || "N/A"}</li>
        <li><strong>Experience Level:</strong> ${experienceLevel || "N/A"}</li>
        <li><strong>End Date:</strong> ${endDate || "N/A"}</li>
      </ul>
      <p>Please confirm your availability at your earliest convenience.</p>
      <p>Best regards,</p>
      <p>${company.name || "Your Company"}</p>
    `;

    // Ensure candidateEmails is an array and send emails
    if (Array.isArray(candidateEmails)) {
      for (const email of candidateEmails) {
        try {
          await sendEmail(email, "Job Alert", emailContent);
          console.log(`Email sent to: ${email}`);
        } catch (err) {
          console.error(`Failed to send email to: ${email}`, err);
        }
      }
    } else {
      return res.status(400).json({ message: "candidateEmails should be an array" });
    }

    // Respond with success
    res.status(200).json({ message: "Job posted successfully and emails sent" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
