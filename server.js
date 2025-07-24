import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import sequelize instance
import { sequelize } from './config/db.js';

// ✅ Import models
import User from './models/User.js';
import Book from './models/book.js';
import Review from './models/Review.js';

// ✅ Define relationships
User.hasMany(Book, { foreignKey: 'created_by' });
Book.belongsTo(User, { foreignKey: 'created_by' });

Book.hasMany(Review, { foreignKey: 'book_id' });
Review.belongsTo(Book, { foreignKey: 'book_id' });

User.hasMany(Review, { foreignKey: 'reviewer_id' });
Review.belongsTo(User, { foreignKey: 'reviewer_id' });

// ✅ Connect DB + Sync models
try {
  await sequelize.authenticate();
  console.log('✅ DB connected');
  await sequelize.sync({ alter: true });
  console.log('✅ DB synced');
} catch (error) {
  console.error('❌ DB error:', error);
}

// ✅ Import routes AFTER db setup
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import reviewRoutes from './routes/reviews.js';

// ✅ Use routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);

// ✅ Basic route
app.get('/', (req, res) => res.send('Book Review API running...'));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
