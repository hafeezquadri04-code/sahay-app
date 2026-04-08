import Profile from '../models/Profile.js';

const defaultProfile = {
	fullName: '',
	age: 0,
	gender: '',
	state: '',
	district: '',
	education: '',
	occupation: '',
	annualIncome: 0,
	category: '',
	disabilityStatus: '',
};

export async function getProfileByUserId(userId) {
	if (!userId) return null;
	const profile = await Profile.findOne({ user: userId }).lean();
	if (!profile) return null;
	// ensure all keys present
	return { ...defaultProfile, ...profile };
}

export async function upsertProfile(userId, payload) {
	if (!userId) {
		const err = new Error('User id is required');
		err.status = 400;
		throw err;
	}

	const values = {
		...defaultProfile,
		...payload,
		user: userId,
	};

	const updated = await Profile.findOneAndUpdate({ user: userId }, values, {
		new: true,
		upsert: true,
		setDefaultsOnInsert: true,
	}).lean();

	return updated;
}

export default { getProfileByUserId, upsertProfile };
