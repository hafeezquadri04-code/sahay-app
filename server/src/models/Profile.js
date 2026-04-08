import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
		fullName: { type: String, default: '' },
		age: { type: Number, default: 0 },
		gender: { type: String, default: '' },
		state: { type: String, default: '' },
		district: { type: String, default: '' },
		education: { type: String, default: '' },
		occupation: { type: String, default: '' },
		annualIncome: { type: Number, default: 0 },
		category: { type: String, default: '' },
		disabilityStatus: { type: String, default: '' },
	},
	{ timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
