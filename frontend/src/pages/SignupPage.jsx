import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (password !== confirm) {
      alert("Mật khẩu không khớp");
      return;
    }
    // TODO: call Supabase sign up
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-skin-50 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-warm-500 p-8">
          <div className="text-white text-center">
            <div className="text-4xl font-bold mb-2">Chào mừng!</div>
            <p className="text-sm opacity-90">
              Tạo tài khoản để bắt đầu hành trình học tiếng Nhật.
            </p>
            <div className="mt-6">
              <img
                src="/images/signup.jpg"
                alt="signup"
                className="w-40 h-40 rounded-lg object-cover shadow-lg mx-auto"
              />
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-1">Đăng ký</h2>
          <p className="text-sm text-gray-500 mb-6">
            Nhanh chóng, an toàn và miễn phí.
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <label className="block">
              <span className="text-xs text-gray-600">Họ và tên</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-warm-500"
                required
              />
            </label>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

              <label className="block">
                <span className="text-xs text-gray-600">Xác nhận mật khẩu</span>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-warm-500"
                  required
                />
              </label>
            </div>

            <button className="w-full py-2 bg-warm-500 text-white rounded-lg font-semibold hover:bg-warm-600 transition">
              Tạo tài khoản
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-warm-600 font-medium">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
