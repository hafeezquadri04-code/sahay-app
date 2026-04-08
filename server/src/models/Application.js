import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  userId: { type: String },
  schemeId: { type: String },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);