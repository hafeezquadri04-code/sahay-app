import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/User.js';
import Scheme from '../models/Scheme.js';

// Hard-coded admin credentials for hackathon demo
const ADMIN_EMAIL = 'admin@sahay.com';
const ADMIN_PASSWORD = 'admin123';

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const adminToken = jwt.sign(
      { role: 'admin', email: ADMIN_EMAIL },
      JWT_SECRET,
      { expiresIn: '4h' }
    );

    return res.json({
      adminToken,
      message: 'Admin login successful',
      admin: { email: ADMIN_EMAIL, role: 'admin' },
    });
  } catch (err) {
    return next(err);
  }
};

export const getAdminDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const schemes = await Scheme.find().lean();
    const totalSchemes = schemes.length;

    return res.json({
      stats: {
        totalUsers,
        totalSchemes,
        activeApplications: 0,
      },
      schemes: schemes.map((s) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        applicationsCount: 0, // Placeholder
      })),
      message: 'Admin dashboard data loaded',
    });
  } catch (err) {
    return next(err);
  }
};

export default { adminLogin, getAdminDashboard };
