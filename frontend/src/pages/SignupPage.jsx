import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader, AlertCircle, CheckCircle } from "lucide-react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (password !== confirm) {
      setError("Mật khẩu không khớp");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đăng ký thất bại");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
            <h1 className="text-5xl font-bold mb-3">Chào mừng!</h1>
            <p className="text-lg opacity-95 mb-8">
              Bắt đầu hành trình học tiếng Nhật
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <img
                src="/images/kawaii-cat-sad-cat-1024x768-10077.jpg"
                alt="Sign up"
                className="w-56 h-56 rounded-2xl object-cover shadow-2xl"
              />
            </div>
            <p className="mt-6 text-sm opacity-90 max-w-xs mx-auto">
              Miễn phí • Nhanh • An toàn
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Tạo tài khoản
            </h2>
            <p className="text-gray-600">
              Đăng ký miễn phí và bắt đầu học tiếng Nhật ngay hôm nay
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

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
              <CheckCircle
                className="text-green-600 flex-shrink-0 mt-0.5"
                size={20}
              />
              <p className="text-green-700 text-sm">
                Đăng ký thành công! Chuyển hướng đến trang đăng nhập...
              </p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
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
                placeholder="Ít nhất 6 ký tự"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3 bg-gradient-to-r from-warm-500 to-warm-600 text-white rounded-xl font-bold hover:shadow-lg hover:from-warm-600 hover:to-warm-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Đang xử lý...
                </>
              ) : success ? (
                <>
                  <CheckCircle size={20} />
                  Đăng ký thành công!
                </>
              ) : (
                "Tạo tài khoản"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            <p>
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-warm-600 font-bold hover:text-warm-700 transition"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
