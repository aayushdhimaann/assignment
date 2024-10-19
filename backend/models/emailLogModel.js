const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  candidateEmail: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmailLog', emailLogSchema);
