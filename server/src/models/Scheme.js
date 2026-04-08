import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // external identifier used by frontend
    name: { type: String, required: true },
    category: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    eligibilitySummary: { type: String, default: '' },
    eligibility: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    requiredDocuments: { type: [String], default: [] },
    applicationProcess: { type: [String], default: [] },
    targetAudience: { type: String, default: '' },
    benefitHighlight: { type: String, default: '' },
    recommendedFor: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model('Scheme', schemeSchema);