import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function AddBook() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to add a book!");
      return;
    }

    try {
      await API.post("/books", { title, author, genre });
      navigate("/"); // go back to book list
            alert("✅ Book added successfully!");

    } catch (err) {
      console.error(err);
      alert("Failed to add book!");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-96">
        <h2 className="text-xl mb-4 font-bold">➕ Add New Book</h2>

        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border mb-3"
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border mb-3"
          required
        />

        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full p-2 border mb-3"
          required
        />

        <button className="bg-green-500 w-full text-white p-2 rounded">
          Add Book
        </button>
      </form>
    </div>
  );
}
