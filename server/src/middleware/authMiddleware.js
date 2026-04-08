import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import * as authService from '../services/authService.js';

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const err = new Error('Not authorized, token missing');
      err.status = 401;
      throw err;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded?.id) {
      const err = new Error('Invalid token');
      err.status = 401;
      throw err;
    }

    const user = await authService.getUserById(decoded.id);
    if (!user) {
      const err = new Error('User not found');
      err.status = 401;
      throw err;
    }

    // attach minimal user info
    req.user = { id: user._id, name: user.name, email: user.email };
    return next();
  } catch (err) {
    return next(err);
  }
};

export default { protect };