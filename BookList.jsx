import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

// ⭐ Component to display stars (used for preview)
function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return (
    <div className="flex items-center gap-1 text-yellow-500 text-sm">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      <span className="ml-2 text-gray-600 text-xs">
        {rating.toFixed(1)}/5
      </span>
    </div>
  );
}

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await API.get(
        `/books?page=${page}&limit=6${genre ? `&genre=${genre}` : ""}${
          author ? `&author=${author}` : ""
        }`
      );
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to fetch books", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [page]); // only refetch when page changes

  const applyFilters = () => {
    setPage(1); // reset page when filtering
    fetchBooks();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📚 Book List</h1>

      {/* ✅ Filter Section */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <input
          type="text"
          placeholder="Filter by Genre"
          className="border p-2 rounded w-40"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Author"
          className="border p-2 rounded w-40"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button
          onClick={applyFilters}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      {/* ✅ Book List */}
      {loading ? (
        <p className="text-center">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500">No books found</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((b) => (
            <div
              key={b.id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition duration-200"
            >
              <h2 className="text-xl font-bold mb-1">{b.title}</h2>
              <p className="text-gray-700">✍️ Author: {b.author}</p>
              <p className="text-gray-700">📖 Genre: {b.genre}</p>

              {/* If you want to preview avg rating (needs backend to return avgRating) */}
              {b.avgRating !== undefined && (
                <div className="mt-2">
                  <StarRating rating={b.avgRating} />
                </div>
              )}

              <Link
                to={`/books/${b.id}`}
                className="block mt-3 text-blue-500 font-medium hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded ${
            page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          ⬅ Prev
        </button>

        <span className="font-bold">Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
