const sendEmail = require('../utils/sendEmail');
const Job = require('../models/jobModel');

exports.sendJobAlert = async (req, res) => {
  const { candidateEmail, jobId } = req.body;
  try {
    const job = await Job.findById(jobId).populate('company');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const emailContent = `
      Job Title: ${job.title}
      Description: ${job.description}
      Experience Level: ${job.experienceLevel}
      Company: ${job.company.name}
    `;
    
    sendEmail(candidateEmail, 'Job Alert', emailContent);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
