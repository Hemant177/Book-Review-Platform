// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";

// export default function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/auth/signup", { name, email, password });
//       alert("Signup successful! Please login.");
//       navigate("/login");
//     } catch (err) {
//       alert("Signup failed (email may already exist)");
//     }
//   };

//   return (
//     <div className="flex justify-center mt-10">
//       <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-80">
//         <h2 className="text-xl mb-4 font-bold">Signup</h2>
//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full p-2 border mb-3"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border mb-3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border mb-3"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="bg-green-500 w-full text-white p-2 rounded">Signup</button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../css/Auth.css"; // ✅ Import same styles

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", { name, email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed (email may already exist)");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-btn">Signup</button>
      </form>
    </div>
  );
}
