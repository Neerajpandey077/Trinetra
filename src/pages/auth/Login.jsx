import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      alert("Please enter your email/mobile number and password.");
      return;
    }

    alert("Login successful!");
    navigate("/citizen");

    // Later we will replace this with:
    // API call → FastAPI → PostgreSQL → dashboard
  };

  return (
    <div className="login-page">

      {/* HEADER */}
      <header className="masthead">
        <div className="masthead-inner">

          <div className="logo-plate">
            <img
              src="/trinetra-logo.jpg"
              alt="TRINETRA logo"
            />
          </div>

          <div className="brand-text">
            <div className="name">TRINETRA</div>
            <div className="tagline">
              See. Verify. Improve.
            </div>
          </div>

          <div className="masthead-right">
            Public Infrastructure Monitoring System
            <br />
            MPLAD Scheme Transparency Portal
          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className="login-main">

        <div className="login-card">

          <div className="card-eyebrow">
            Secure sign-in
          </div>

          <h1>Sign in to TRINETRA</h1>

          <p className="lead">
            Enter your registered email or mobile number and password
            to continue.
          </p>

          <form onSubmit={handleSubmit}>

            {/* EMAIL / MOBILE */}
            <div className="field">

              <label htmlFor="identifier">
                Email or mobile number
              </label>

              <div className="input-row">

                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  placeholder="you@example.com or 98765 43210"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />

              </div>
            </div>

            {/* PASSWORD */}
            <div className="field">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-row">

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-pressed={showPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            {/* REMEMBER / FORGOT */}
            <div className="row-between">

              <label className="remember">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                />

                Remember me

              </label>

              <a href="#" className="forgot-link">
                Forgot password?
              </a>

            </div>

            {/* SIGN IN */}
            <button
              type="submit"
              className="btn-primary"
            >
              Sign In
            </button>

            <p className="redirect-note">
              You will be directed to your citizen or officer
              dashboard based on your registered account.
            </p>

          </form>

          {/* DIVIDER */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* REGISTER */}
          <p className="register-line">
            New to TRINETRA?{" "}
            <a href="#">
              Create an account
            </a>
          </p>

          {/* SECURITY */}
          <div className="security-note">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              width="15"
              height="15"
            >
              <rect
                x="4"
                y="10"
                width="16"
                height="10"
                rx="1.5"
              />

              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>

            <span>
              Encrypted, session-based authentication.
              Your password is never stored in plain text.
            </span>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer>
        © 2026 TRINETRA — Built for{" "}
        <strong>Smart India Hackathon</strong> by Team{" "}
        <strong>Foresight Perceivers</strong>
      </footer>

    </div>
  );
}

export default Login;