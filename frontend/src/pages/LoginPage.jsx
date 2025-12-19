import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đăng nhập thất bại");
        return;
      }

      // Save token and user to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-skin-50 via-white to-skin-100 px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel - Image & Branding */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-warm-500 to-warm-600 p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-warm-700 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-warm-400 rounded-full"></div>
          </div>
          <div className="text-center text-white relative z-10">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <div className="text-4xl">🐱</div>
            </div>
            <h1 className="text-5xl font-bold mb-3">Neko Nihongo</h1>
            <p className="text-lg opacity-95 mb-8">Học tiếng Nhật thật vui</p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <img
                src="/images/kawaii-cat-sad-cat-1024x768-10077.jpg"
                alt="Neko Nihongo"
                className="w-56 h-56 rounded-2xl object-cover shadow-2xl"
              />
            </div>
            <p className="mt-6 text-sm opacity-90 max-w-xs mx-auto">
              Nghe • Nói • Đọc • Viết
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Đăng nhập
            </h2>
            <p className="text-gray-600">
              Tiếp tục hành trình học tiếng Nhật của bạn
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle
                className="text-red-600 flex-shrink-0 mt-0.5"
                size={20}
              />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-warm-500 to-warm-600 text-white rounded-xl font-bold hover:shadow-lg hover:from-warm-600 hover:to-warm-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            <p>
              Chưa có tài khoản?{" "}
              <Link
                to="/signup"
                className="text-warm-600 font-bold hover:text-warm-700 transition"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
