import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

// ⭐ Component to display stars for rating
function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-500 text-xl">
            ★
          </span>
        ))}
      {halfStar && (
        <span className="text-yellow-500 text-xl">☆</span>
      )}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-400 text-xl">
            ★
          </span>
        ))}
      <span className="ml-2 text-gray-600 text-sm">
        {rating.toFixed(1)}/5
      </span>
    </div>
  );
}

export default function BookDetail() {
  const { id } = useParams(); // Get bookId from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Reviews
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const fetchBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setBook(res.data);
    } catch (err) {
      console.error("Failed to fetch book details", err);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/reviews/${id}`, {
        review_text: reviewText,
        rating,
      });
      alert("✅ Review added!");
      setReviewText("");
      setRating(5);
      fetchBook(); // refresh reviews
    } catch (err) {
      alert("❌ Failed to add review (Are you logged in?)");
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading book...</p>;
  if (!book) return <p className="text-center mt-10">Book not found ❌</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-700">✍️ Author: {book.author}</p>
      <p className="text-gray-700">📖 Genre: {book.genre}</p>

      {/* ⭐ Average Rating */}
      <div className="mt-3">
        <StarRating rating={book.avgRating} />
      </div>

      {/* ✅ Reviews Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        {book.Reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        ) : (
          <div className="space-y-3">
            {book.Reviews.map((rev) => (
              <div
                key={rev.id}
                className="border p-3 rounded shadow-sm bg-gray-50"
              >
                <StarRating rating={rev.rating} />
                <p className="mt-1">{rev.review_text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Add Review Form */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Add Your Review</h2>
        <form
          onSubmit={submitReview}
          className="flex flex-col gap-3 bg-white shadow p-4 rounded"
        >
          <textarea
            className="border p-2 rounded"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>

          <select
            className="border p-2 rounded"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={5}>⭐ 5 Stars</option>
            <option value={4}>⭐ 4 Stars</option>
            <option value={3}>⭐ 3 Stars</option>
            <option value={2}>⭐ 2 Stars</option>
            <option value={1}>⭐ 1 Star</option>
          </select>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
