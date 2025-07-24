import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AddBook from "./pages/addbook";
import BooksList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import Footer from "./components/footer"; 

export default function App() {
  return (
    <AuthProvider>
        
        <div
          className="flex flex-col min-h-screen bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/bg.jpg')",
          }}
        >
          {/* Dark overlay for better readability */}
          <div className="bg-black/40 flex flex-col min-h-screen w-full">
            <BrowserRouter>
            {/* Navbar always on top */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-grow max-w-5xl mx-auto p-6">
             <Routes>
  <Route path="/add-book" element={<AddBook />} />
  <Route path="/" element={<BooksList />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/books/:id" element={<BookDetail />} />
</Routes>
</main>

            {/* </div> */}

            {/* ✅ Footer always at bottom */}
            <Footer />
               </BrowserRouter>
          </div>
        </div>
   
    </AuthProvider>
  );
}
