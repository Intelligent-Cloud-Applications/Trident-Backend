import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";

/**
 * Admin Login — Simple, clean login page.
 * Just ID + Password. No fluff.
 */

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, error: authError } = useAuth();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (!id || !password) {
      setLocalError("Please enter both Email and Password.");
      return;
    }
    const result = await login(id.trim(), password);
    if (result.success) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setLocalError(result.error || "Login failed");
    }
  };

  const displayError = localError || authError;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10"
      style={{ background: 'linear-gradient(135deg, #070B1A 0%, #0f172a 40%, #1A2660 80%, #070B1A 100%)' }}>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-[#2C3A8C]/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[15%] w-[200px] h-[200px] bg-[#E8BD63]/8 rounded-full blur-[80px]" />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[400px] relative z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          padding: '40px 36px',
        }}>

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#E8BD63] to-[#C99E47] flex items-center justify-center shadow-lg shadow-[#E8BD63]/20 mb-4">
            <Lock size={24} className="text-[#1A2660]" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
          <p className="text-white/30 text-sm mt-1">Trident Academy of Technology</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Email / ID */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-2">
              Email ID
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="admin@tat.tekkzy.com"
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40 transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-white/40 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-4 py-3 pr-12 rounded-xl text-sm text-white placeholder-white/20 font-medium outline-none focus:ring-2 focus:ring-[#E8BD63]/40 transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {displayError && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium text-red-300 bg-red-500/10 border border-red-500/20">
              <span>⚠</span> {displayError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #E8BD63, #C99E47)',
              color: '#1A2660',
              boxShadow: '0 8px 24px rgba(232,189,99,0.25)',
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Back link */}
        <div className="text-center mt-6">
          <a href="/" className="text-white/25 text-xs hover:text-white/50 transition-colors">
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
