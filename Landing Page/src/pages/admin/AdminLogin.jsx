import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, ArrowRight, Loader2, Shield } from "lucide-react";

/**
 * Trident Academy — Admin Portal Sign In
 * Adapted from Foundry No. 12 template.
 */

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, error: authError } = useAuth();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);



  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(null);
  const [localError, setLocalError] = useState("");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const panelRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px, y: py });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (!id || !password) {
      setLocalError("Enter your Email and password to continue.");
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
    <div
      className="min-h-screen w-full flex pt-28"
      style={{ backgroundColor: "#12181F", fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawIn {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.08); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes checkPop {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes gridDrift {
          from { background-position: 0 0; }
          to { background-position: 0 40px; }
        }
        .fade-up { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .draw-in { animation: drawIn 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .float-slow { animation: floatY 6s ease-in-out infinite; }
        .glow-pulse { animation: pulseGlow 5s ease-in-out infinite; }
        .grid-drift { animation: gridDrift 3s linear infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #F3EEE2 40%, #2C3A8C 50%, #F3EEE2 60%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 4s ease-in-out infinite;
        }
        .check-pop { animation: checkPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      {/* LEFT — ink panel / living specimen */}
      <div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        className="hidden lg:flex lg:w-[46%] relative flex-col justify-between p-14 overflow-hidden"
        style={{ backgroundColor: "#12181F" }}
      >
        {/* drifting rule grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none grid-drift"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 39px, #2C3A8C 39px, #2C3A8C 40px)",
          }}
        />

        {/* ambient glow orb */}
        <div
          className="absolute w-[420px] h-[420px] rounded-full pointer-events-none glow-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(44,58,140,0.35) 0%, rgba(44,58,140,0) 70%)",
            top: "38%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(10px)",
          }}
        />

        {/* floating dust motes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none float-slow"
            style={{
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              backgroundColor: "#2C3A8C",
              opacity: 0.45,
              top: `${15 + i * 13}%`,
              left: `${10 + ((i * 17) % 75)}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + i}s`,
            }}
          />
        ))}

        <div className="relative fade-up" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center rounded-full border transition-transform duration-500 hover:rotate-[20deg]"
              style={{ borderColor: "#2C3A8C", color: "#A59381" }}
            >
              <Shield size={14} />
            </div>
            <span className="text-sm tracking-[0.25em] uppercase" style={{ color: "#8B93A3" }}>
              Trident Academy
            </span>
          </div>
        </div>

        <div className="relative z-10 pointer-events-none">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4 fade-up"
            style={{ color: "#A59381", animationDelay: "0.15s" }}
          >
            Secured Access — Admin Panel
          </p>
          <div
            className="leading-[0.95] select-none fade-up shimmer-text"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              animationDelay: "0.25s",
              transform: `translate(${tilt.x * 10}px, ${tilt.y * 10}px)`,
              transition: "transform 0.3s ease-out",
              display: "inline-block",
            }}
          >
            Trident
          </div>
          <br/>
          <div
            className="leading-[0.95] select-none fade-up"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              color: "#6B7383",
              animationDelay: "0.35s",
              transform: `translate(${tilt.x * 16}px, ${tilt.y * 16}px)`,
              transition: "transform 0.3s ease-out",
              display: "inline-block",
            }}
          >
            Portal
          </div>

          <div className="mt-8 h-px w-full relative overflow-hidden pointer-events-none" style={{ backgroundColor: "#20293A" }}>
            <div
              className="absolute inset-y-0 left-0 h-px draw-in"
              style={{ backgroundColor: "#2C3A8C", animationDelay: "0.6s" }}
            />
          </div>

          <p
            className="mt-6 text-[15px] leading-relaxed max-w-sm fade-up"
            style={{ color: "#8B93A3", animationDelay: "0.45s" }}
          >
            Manage notices, events, and institutional content securely. 
            Designed exclusively for authorized personnel of Trident Academy of Technology.
          </p>
        </div>

        <div
          className="relative flex items-center justify-between text-xs fade-up"
          style={{ color: "#5C6474", animationDelay: "0.55s" }}
        >
          <span className="tracking-wider">TAT BHUBANESWAR</span>
        </div>
      </div>

      {/* RIGHT — paper panel / form */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-16 relative overflow-hidden"
        style={{ backgroundColor: "#F3EEE2" }}
      >
        {/* subtle corner glow for warmth */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none glow-pulse"
          style={{
            background: "radial-gradient(circle, rgba(44,58,140,0.08) 0%, rgba(44,58,140,0) 70%)",
            top: "-10%",
            right: "-10%",
          }}
        />

        <div className="w-full max-w-sm relative z-10">
          {/* mobile brand mark */}
          <div className="lg:hidden mb-10 flex items-center gap-3 fade-up">
            <div
              className="w-8 h-8 flex items-center justify-center rounded-full border"
              style={{ borderColor: "#2C3A8C", color: "#2C3A8C" }}
            >
              <Shield size={14} />
            </div>
            <span className="text-sm tracking-[0.25em] uppercase" style={{ color: "#7A7267" }}>
              Trident Academy
            </span>
          </div>

          <h1
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, color: "#1C2430" }}
            className="text-4xl mb-2 fade-up"
          >
            Welcome back
          </h1>
          <p className="text-[15px] mb-10 fade-up" style={{ color: "#7A7267", animationDelay: "0.08s" }}>
            Sign in with your admin credentials to continue.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="fade-up" style={{ animationDelay: "0.16s" }}>
              <Field
                label="Email Address"
                type="text"
                value={id}
                onChange={setId}
                placeholder="e.g. admin@tat.tekkzy.com"
                focused={focused === "id"}
                onFocus={() => setFocused("id")}
                onBlur={() => setFocused(null)}
                autoComplete="username"
              />
            </div>

            <div className="h-6" />

            <div className="fade-up" style={{ animationDelay: "0.24s" }}>
              <Field
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={setPassword}
                placeholder="••••••••••"
                focused={focused === "password"}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                autoComplete="current-password"
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="p-1 -mr-1 rounded transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 hover:scale-110"
                    style={{ color: "#7A7267", "--tw-ring-color": "#2C3A8C" }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <span
                      key={showPassword ? "hide" : "show"}
                      className="fade-up"
                      style={{ animationDuration: "0.3s", display: "inline-flex" }}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </span>
                  </button>
                }
              />
            </div>

            {displayError && (
              <p
                role="alert"
                className="mt-6 text-[13px] rounded-md px-3 py-2 fade-up"
                style={{ color: "#9A3B2E", backgroundColor: "#F3E1DB" }}
              >
                {displayError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full h-12 rounded-md flex items-center justify-center gap-2 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 fade-up"
              style={{
                backgroundColor: "#1C2430",
                color: "#F3EEE2",
                "--tw-ring-color": "#2C3A8C",
                "--tw-ring-offset-color": "#F3EEE2",
                animationDelay: "0.38s",
                boxShadow:
                  focused && !loading ? "0 8px 24px -8px rgba(44,58,140,0.35)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = "#2C3A8C";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = "#1C2430";
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Authenticating
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
          
          <div className="text-center mt-10">
            <a href="/" className="text-xs transition-colors hover:underline fade-up" style={{ color: "#8A6C22", animationDelay: "0.45s" }}>
              &larr; Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, value, onChange, placeholder, focused, onFocus, onBlur, autoComplete, trailing }) {
  return (
    <div>
      <label
        className="block text-[11px] tracking-[0.2em] uppercase mb-2 transition-colors duration-300"
        style={{ color: focused ? "#2C3A8C" : "#7A7267" }}
      >
        {label}
      </label>
      <div className="flex items-end">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full bg-transparent text-[15px] py-2 outline-none placeholder:text-[#B4AA98] transition-transform duration-300"
          style={{ color: "#1C2430", transform: focused ? "translateY(-1px)" : "translateY(0)" }}
        />
        {trailing}
      </div>
      <div className="relative h-px w-full" style={{ backgroundColor: "#DDD3BE" }}>
        <div
          className="absolute inset-y-0 left-0 h-px transition-all duration-500 ease-out"
          style={{ backgroundColor: "#2C3A8C", width: focused ? "100%" : "0%" }}
        />
      </div>
    </div>
  );
}
