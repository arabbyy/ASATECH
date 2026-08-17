import { useState } from "react";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogActions, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Surfaces";
import { TextField } from "@/components/ui/Field";
import { useToast } from "@/state/ToastContext";
import { PAYMENT_METHODS } from "@/data/mock";

export default function PaymentMethods() {
  const toast = useToast();
  const [methods, setMethods] = useState(PAYMENT_METHODS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ holder: "", number: "", expiry: "", cvv: "" });

  const addMethod = () => {
    if (!form.number.trim() || !form.holder.trim()) {
      toast.error("Please fill in the card details.");
      return;
    }
    setMethods((m) => [
      ...m,
      {
        id: `pm-${Date.now()}`,
        type: "card",
        brand: "Card",
        last4: form.number.slice(-4),
        expiry: form.expiry,
        holder: form.holder,
        default: m.length === 0,
      },
    ]);
    setOpen(false);
    setForm({ holder: "", number: "", expiry: "", cvv: "" });
    toast.success("Card added", "New payment method saved.");
  };

  const removeMethod = (id) => {
    setMethods((m) => m.filter((x) => x.id !== id));
    toast.success("Payment method removed");
  };

  const setDefault = (id) => {
    setMethods((m) => m.map((x) => ({ ...x, default: x.id === id })));
    toast.success("Default payment method updated");
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Payment methods</h1>
          <p className="mt-1 text-sm text-muted">Cards you use for checkout.</p>
        </div>
        <Button onClick={() => setOpen(true)} icon={Plus}>
          Add card
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {methods.map((m) => (
          <Card key={m.id} className="relative p-5">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                <CreditCard className="h-5 w-5" />
              </span>
              <button onClick={() => removeMethod(m.id)} aria-label="Remove card" className="text-faint hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-sm font-semibold text-ink">
              {m.brand} •••• {m.last4}
            </p>
            <p className="text-xs text-muted">Expires {m.expiry}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              {m.default ? (
                <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-medium text-brand-500">Default</span>
              ) : (
                <button onClick={() => setDefault(m.id)} className="text-xs font-medium text-brand-500 hover:text-brand-600">
                  Make default
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle className="flex items-center justify-between pr-2">
          <span className="text-base font-semibold">Add payment method</span>
          <IconButton onClick={() => setOpen(false)} size="small" aria-label="Close">
            <X className="h-4 w-4" />
          </IconButton>
        </DialogTitle>
        <DialogContent className="space-y-3">
          <TextField label="Cardholder name" value={form.holder} onChange={(e) => setForm((f) => ({ ...f, holder: e.target.value }))} />
          <TextField label="Card number" value={form.number} onChange={(e) => setForm((f) => ({ ...f, number: e.target.value.replace(/\D/g, "") }))} />
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Expiry (MM/YY)" value={form.expiry} onChange={(e) => setForm((f) => ({ ...f, expiry: e.target.value }))} />
            <TextField label="CVV" type="password" value={form.cvv} onChange={(e) => setForm((f) => ({ ...f, cvv: e.target.value }))} />
          </div>
          <p className="text-xs text-faint">Demo only — card details are not sent anywhere.</p>
        </DialogContent>
        <DialogActions>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={addMethod}>Add card</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
