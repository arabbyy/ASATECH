import { useState } from "react";
import { MonitorSmartphone, ShieldCheck, KeyRound, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, SectionHeader } from "@/components/ui/Surfaces";
import { PasswordInput } from "@/components/ui/Field";
import { useToast } from "@/state/ToastContext";
import { SESSIONS, LOGIN_ACTIVITY } from "@/data/mock";
import { formatDateTime } from "@/lib/format";

export default function Security() {
  const toast = useToast();
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [sessions, setSessions] = useState(SESSIONS);
  const [twoFA, setTwoFA] = useState(false);

  const changePassword = (e) => {
    e.preventDefault();
    setError("");
    if (pwd.next.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (pwd.next !== pwd.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setPwd({ current: "", next: "", confirm: "" });
      toast.success("Password updated", "Your password was changed.");
    }, 600);
  };

  const signOutSession = (id) => {
    setSessions((s) => s.filter((x) => x.id !== id));
    toast.success("Session signed out");
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Security</h1>
        <p className="mt-1 text-sm text-muted">Manage your password, sessions and login activity.</p>
      </div>

      {/* Password */}
      <Card className="p-5 sm:p-6">
        <SectionHeader title="Change password" subtitle="Choose a strong, unique password." />
        <form onSubmit={changePassword} className="mt-5 max-w-md space-y-4">
          <PasswordInput label="Current password" value={pwd.current} onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))} required />
          <PasswordInput label="New password" value={pwd.next} onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))} error={error} required />
          <PasswordInput label="Confirm new password" value={pwd.confirm} onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))} required />
          <Button type="submit" loading={saving} icon={KeyRound}>
            Update password
          </Button>
        </form>
      </Card>

      {/* Two-factor preference */}
      <Card className="flex items-center justify-between gap-4 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Two-factor authentication</p>
            <p className="text-sm text-muted">Add an extra layer of security to your account.</p>
          </div>
        </div>
        <button
          onClick={() => {
            setTwoFA((v) => !v);
            toast.info(twoFA ? "2FA disabled" : "2FA enabled (connects to backend)");
          }}
          role="switch"
          aria-checked={twoFA}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${twoFA ? "bg-brand-600" : "bg-raised border border-line"}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${twoFA ? "left-[22px]" : "left-0.5"}`} />
        </button>
      </Card>

      {/* Active sessions */}
      <Card className="p-5 sm:p-6">
        <SectionHeader title="Active sessions" subtitle="Devices currently signed in to your account." />
        <ul className="mt-5 divide-y divide-line">
          {sessions.map((s) => (
            <li key={s.id} className="flex items-center gap-4 py-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-raised text-muted">
                <MonitorSmartphone className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-ink">{s.device}</p>
                  {s.current && (
                    <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-[0.65rem] font-semibold text-brand-500">This device</span>
                  )}
                </div>
                <p className="text-xs text-muted">{s.location} · {s.ip} · {formatDateTime(s.lastActive)}</p>
              </div>
              {!s.current && (
                <button onClick={() => signOutSession(s.id)} className="text-sm font-medium text-red-500 hover:text-red-600">
                  Sign out
                </button>
              )}
            </li>
          ))}
        </ul>
      </Card>

      {/* Login activity */}
      <Card className="p-5 sm:p-6">
        <SectionHeader title="Recent login activity" subtitle="Recent sign-ins to your account." />
        <ul className="mt-5 divide-y divide-line">
          {LOGIN_ACTIVITY.map((a) => (
            <li key={a.id} className="flex items-center gap-4 py-3">
              {a.status === "success" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
              ) : (
                <XCircle className="h-5 w-5 shrink-0 text-red-500" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">{a.device}</p>
                <p className="text-xs text-muted">{a.location}</p>
              </div>
              <span className="text-xs text-faint">{formatDateTime(a.at)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
