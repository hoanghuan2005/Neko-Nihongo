import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // sau này bạn có thể gọi Supabase login API ở đây
    if (email && password) {
      console.log("Logging in with:", email, password);
      navigate("/home");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
      <div className="bg-white/80 backdrop-blur-md p-8 mx-5 rounded-2xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          NekoNihongo 🐾
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-all"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-pink-500 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
