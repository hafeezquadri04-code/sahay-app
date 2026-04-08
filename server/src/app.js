import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import schemeRoutes from './routes/schemeRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFound } from './middleware/notFoundMiddleware.js';
import errorHandler from './middleware/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/admin', adminRoutes);

// Keep a simple root route
app.get('/', (req, res) => res.send('Sahay API Root'));

// Add a base API route so /api does not return 404
app.get('/api', (req, res) =>
  res.json({
    message: 'Sahay API Root',
    availableRoutes: ['/api/auth', '/api/users', '/api/schemes', '/api/health', '/api/chatbot', '/api/admin'],
  })
);

// 404 and error handlers
app.use(notFound);
app.use(errorHandler);

export default app;