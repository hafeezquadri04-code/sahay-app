import * as userService from '../services/userService.js';

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

export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const profile = await userService.getProfileByUserId(userId);
    return res.json({ profile: profile || defaultProfile });
  } catch (err) {
    return next(err);
  }
};

export const saveUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const payload = req.body || {};
    const saved = await userService.upsertProfile(userId, payload);
    return res.json({ profile: saved, message: 'Profile saved successfully' });
  } catch (err) {
    return next(err);
  }
};

export default { getUserProfile, saveUserProfile };