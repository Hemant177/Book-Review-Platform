// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import { AuthContext } from "../context/AuthContext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", { email, password });
//       login(res.data.user, res.data.token);
//       navigate("/");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex justify-center mt-10">
//       <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-80">
//         <h2 className="text-xl mb-4 font-bold">Login</h2>
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
//         <button className="bg-blue-500 w-full text-white p-2 rounded">Login</button>
//       </form>
//     </div>
//   );
// }
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../css/Auth.css";  // ✅ Import styles

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      // navigate("/");
      navigate("/add-book");

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button className="auth-btn">Login</button>
      </form>
    </div>
  );
}
