// // import { Link, useNavigate } from "react-router-dom";
// // import { useContext } from "react";
// // import { AuthContext } from "../context/AuthContext";


// //   export default function Navbar() {
// //   const { user, logout } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   return (
// //     <nav className="p-4 bg-blue-700 text-white shadow flex justify-between items-center">
// //       <Link to="/" className="font-bold text-xl hover:text-yellow-300">📚 Book Review</Link>
// //       <div className="space-x-4 flex items-center">
// //         <Link to="/" className="hover:text-yellow-300">Books</Link>
// //         {user && (
// //           <Link to="/add-book" className="hover:text-yellow-300">Add Book</Link>
// //         )}
// //         {!user ? (
// //           <>
// //             <Link to="/login" className="hover:text-yellow-300">Login</Link>
// //             <Link to="/signup" className="hover:text-yellow-300">Signup</Link>
// //           </>
// //         ) : (
// //           <button
// //             onClick={() => {
// //               logout();
// //               navigate("/");
// //             }}
// //             className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
// //           >
// //             Logout ({user.name})
// //           </button>
// //         )}
// //       </div>
// //     </nav>
// //   );
// //   }
// // import React from "react";
// // import { Link } from "react-router-dom";
// // import "./Navbar.css";

// // const Navbar = () => {
// //   return (
// //     <header className="header">
// //       <div className="navbar-container">

// //         {/* Left: Logo */}
// //         <Link to="/" className="logo">
// //           <i className="fas fa-book" style={{ marginRight: "8px", color: "#f39c12" }}></i>
// //           Book Review
// //         </Link>

// //         {/* Middle: Links */}
// //         <nav className="nav-links">
// //           <Link to="/books">Books</Link>
// //         </nav>

// //         {/* Right: Auth Buttons */}
// //         <div className="auth-buttons">
// //           <Link to="/login" className="btn-auth">Login</Link>
// //           <Link to="/signup" className="btn-auth btn-signup">Signup</Link>
// //         </div>

// //       </div>
// //     </header>
// //   );
// // };

// // export default Navbar;
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <header className="header">
//       <div className="navbar-container">

//         {/* Logo */}
//         <Link to="/" className="logo">
//           <i className="fas fa-book" style={{ marginRight: "8px", color: "#f39c12" }}></i>
//           Book Review
//         </Link>

//         {/* Middle Nav Links */}
//         <nav className="nav-links">
//           <Link to="/books">Books</Link>
//         </nav>

//         {/* Right Auth Buttons */}
//         <div className="auth-buttons">
//           <Link to="/login" className="btn-auth">Login</Link>
//           <Link to="/signup" className="btn-auth btn-signup">Signup</Link>
//         </div>
        

//       </div>
//     </header>
//   );
// };

// export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="navbar-container">

        {/* ✅ LEFT SIDE: Logo */}
        <Link to="/" className="logo">
          <i className="fas fa-book" style={{ marginRight: "8px", color: "#f39c12" }}></i>
          Book Review
        </Link>

        {/* ✅ MIDDLE LINKS */}
        <nav className="nav-links">
          <Link to="/">📖 Book List</Link>
          {user && <Link to="/add-book">➕ Add Book</Link>}
        </nav>

        {/* ✅ RIGHT SIDE: Auth Buttons */}
        <div className="auth-buttons">
          {!user ? (
            <>
              <Link to="/login" className="btn-auth">Login</Link>
              <Link to="/signup" className="btn-auth btn-signup">Signup</Link>
            </>
          ) : (
            <>
              <span className="username">👤 {user.name}</span>
              <button onClick={handleLogout} className="btn-auth btn-logout">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
