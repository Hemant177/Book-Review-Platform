import express from 'express';
import Book from '../models/book.js';
import Review from '../models/Review.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// ✅ Add Book
router.post('/', authMiddleware, async (req, res) => {
  const { title, author, genre } = req.body;
  const book = await Book.create({ title, author, genre, created_by: req.userId });
  res.json(book);
});

// ✅ Get Books with filters + pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, genre, author } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let where = {};
  if (genre) where.genre = genre;
  if (author) where.author = author;

  const books = await Book.findAll({ where, limit: parseInt(limit), offset });
  res.json(books);
});

// ✅ Get Book Details + Average Rating
router.get('/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id, { include: Review });
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const avgRating = book.Reviews.length
    ? book.Reviews.reduce((a, b) => a + b.rating, 0) / book.Reviews.length
    : 0;

  res.json({ ...book.toJSON(), avgRating });
});

export default router;
