import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed schemes if DB is connected and collection is empty
    if (mongoose.connection.readyState === 1) {
      try {
        const Scheme = (await import('./src/models/Scheme.js')).default;
        const count = await Scheme.countDocuments();
        if (count === 0) {
          console.log('No schemes found in DB, auto-seeding...');
          const seed = (await import('./src/utils/seedSchemes.js')).default;
          await seed();
          console.log('Auto-seed complete.');
        } else {
          console.log(`${count} schemes already in DB, skipping seed.`);
        }
      } catch (seedErr) {
        console.error('Auto-seed skipped due to error:', seedErr.message);
      }
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();