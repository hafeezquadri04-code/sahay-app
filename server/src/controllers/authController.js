import * as authService from '../services/authService.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await authService.registerUser({ name, email, password });
    return res.status(201).json({ user, token, message: 'Registration successful' });
  } catch (err) {
    return next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser({ email, password });
    return res.json({ user, token, message: 'Login successful' });
  } catch (err) {
    return next(err);
  }
};

export default { registerUser, loginUser };