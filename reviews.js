import express from 'express';
import Review from '../models/Review.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/:bookId', authMiddleware, async (req, res) => {
  const { review_text, rating } = req.body;
  const review = await Review.create({
    book_id: req.params.bookId,
    reviewer_id: req.userId,
    review_text,
    rating
  });
  res.json(review);
});

export default router;
