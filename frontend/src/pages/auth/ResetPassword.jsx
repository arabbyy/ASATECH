import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextField, PasswordInput } from "@/components/ui/Field";
import { resetPassword, requestPasswordReset } from "@/services/authService";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (otp.trim().length < 4) {
      setError("Enter the reset code from your email.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (confirm !== password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ email, otp, password });
      setDone(true);
    } catch (err) {
      if (err.code === "OTP_EXPIRED") {
        setError("Reset code expired. Tap 'Resend code' to get a new one.");
      } else if (err.code === "INVALID_OTP") {
        setError("Invalid reset code. Please double-check and try again.");
      } else {
        setError(err.message || "Unable to reset password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    try {
      await requestPasswordReset(email);
    } catch {
      setError("Could not resend code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  if (done) {
    return (
      <div className="animate-slide-up text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">Password updated</h1>
        <p className="mt-2 text-sm text-muted">You can now sign in with your new password.</p>
        <Button
          onClick={() => navigate("/login")}
          variant="secondary"
          className="mt-6"
        >
          Sign in
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <h1 className="text-2xl font-bold tracking-tight text-ink">Set a new password</h1>
      <p className="mt-1 text-sm text-muted">
        Enter the reset code from your email and choose a strong new password.
      </p>
      <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-500">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        <TextField
          label="Email address"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Reset code"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="000000"
          inputProps={{
            style: {
              letterSpacing: "6px",
              fontSize: "18px",
              textAlign: "center",
              fontVariantNumeric: "tabular-nums",
            },
            maxLength: 6,
          }}
          required
        />
        <PasswordInput
          label="New password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <PasswordInput
          label="Confirm new password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <Button type="submit" loading={loading} className="w-full" size="lg">
          Update password
        </Button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCw className={`h-3.5 w-3.5 ${resending ? "animate-spin" : ""}`} />
          {resending ? "Sending…" : "Resend code"}
        </button>
        <Link to="/login" className="text-sm font-semibold text-brand-500 hover:text-brand-600">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
