import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';
import generateToken from '../utils/generateToken.js';

export async function registerUser({ name, email, password }) {
	if (!name || !email || !password) {
		const err = new Error('Name, email, and password are required');
		err.status = 400;
		throw err;
	}

	const existing = await User.findOne({ email: email.toLowerCase().trim() });
	if (existing) {
		const err = new Error('User with this email already exists');
		err.status = 400;
		throw err;
	}

	const hashed = await hashPassword(password);
	const user = await User.create({ name, email: email.toLowerCase().trim(), password: hashed });

	const token = generateToken(user._id);
	return { user: user.toPublic(), token };
}

export async function loginUser({ email, password }) {
	if (!email || !password) {
		const err = new Error('Email and password are required');
		err.status = 400;
		throw err;
	}

	const user = await User.findOne({ email: email.toLowerCase().trim() });
	if (!user) {
		const err = new Error('Invalid credentials');
		err.status = 401;
		throw err;
	}

	const matched = await comparePassword(password, user.password);
	if (!matched) {
		const err = new Error('Invalid credentials');
		err.status = 401;
		throw err;
	}

	const token = generateToken(user._id);
	return { user: user.toPublic(), token };
}

export async function getUserById(id) {
	if (!id) return null;
	return User.findById(id).select('-password');
}

export default { registerUser, loginUser, getUserById };
