import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      // TODO: integrate Supabase auth
      navigate("/");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-skin-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-warm-500 p-8">
          <div className="text-white text-center">
            <div className="text-4xl font-bold mb-2">Neko Nihongo</div>
            <p className="text-sm opacity-90">
              Học tiếng Nhật vui vẻ — nghe, nói, đọc, viết
            </p>
            <div className="mt-6">
              <img
                src="/images/login.jpg"
                alt="login"
                className="w-40 h-40 rounded-lg object-cover shadow-lg mx-auto"
              />
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-1">Đăng nhập</h2>
          <p className="text-sm text-gray-500 mb-6">
            Đăng nhập để tiếp tục học và đồng bộ tiến trình.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="text-xs text-gray-600">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-warm-500"
                required
              />
            </label>

            <label className="block">
              <span className="text-xs text-gray-600">Mật khẩu</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-warm-500"
                required
              />
            </label>

            <button className="w-full py-2 bg-warm-500 text-white rounded-lg font-semibold hover:bg-warm-600 transition">
              Đăng nhập
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link to="/signup" className="text-warm-600 font-medium">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
