import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const VerifyPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://localhost:5000/api/v1/auth/verify/${encodeURIComponent(token)}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Verification failed");
      }

      setSuccess("🎉 Your email has been verified successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Brand / Title */}
        <h1 style={styles.brand}>RailBuddy</h1>
        <h2 style={styles.title}>Verify Your Email</h2>

        {/* Description */}
        <p style={styles.text}>
          To keep your account secure, we need to confirm that this email
          address belongs to you.
        </p>

        <p style={styles.subText}>
          Click the button below to complete your verification and continue
          using RailBuddy.
        </p>

        {/* Messages */}
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        {/* Action Button */}
        <button
          onClick={handleVerify}
          disabled={loading || success}
          style={{
            ...styles.button,
            opacity: loading || success ? 0.7 : 1,
          }}
        >
          {loading ? "Verifying..." : "Verify Account"}
        </button>

        {/* Footer Note */}
        <p style={styles.footer}>
          🔒 This verification helps us protect your account from unauthorized
          access.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
  },
  card: {
    background: "#ffffff",
    padding: "2.5rem",
    width: "420px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  },
  brand: {
    marginBottom: "0.5rem",
    color: "#2563eb",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  title: {
    marginBottom: "1rem",
  },
  text: {
    fontSize: "15px",
    color: "#374151",
    marginBottom: "0.5rem",
  },
  subText: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "1.5rem",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "#dc2626",
    marginBottom: "1rem",
    fontSize: "14px",
  },
  success: {
    color: "#16a34a",
    marginBottom: "1rem",
    fontSize: "14px",
  },
  footer: {
    marginTop: "1.5rem",
    fontSize: "12px",
    color: "#9ca3af",
  },
};

export default VerifyPage;
