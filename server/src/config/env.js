import dotenv from 'dotenv';

// Load .env from current working directory with override
dotenv.config({ override: true });

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 4000;
// Prioritize MONGO_URI from .env, then MONGODB_URI
export const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

export default {
	NODE_ENV,
	PORT,
	MONGO_URI,
	JWT_SECRET,
};