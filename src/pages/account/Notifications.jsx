import { useState } from "react";
import { Bell, Package, CreditCard, ShieldAlert, Tag } from "lucide-react";
import { Card } from "@/components/ui/Surfaces";
import { EmptyState } from "@/components/ui/Feedback";
import { CUSTOMER_NOTIFICATIONS } from "@/data/mock";
import { formatRelative } from "@/lib/format";

const TYPE_ICON = {
  order: Package,
  payment: CreditCard,
  security: ShieldAlert,
  promo: Tag,
};

export default function Notifications() {
  const [items, setItems] = useState(CUSTOMER_NOTIFICATIONS);
  const unread = items.filter((n) => !n.read).length;

  const markAll = () => setItems((list) => list.map((n) => ({ ...n, read: true })));
  const markOne = (id) => setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Notifications</h1>
          <p className="mt-1 text-sm text-muted">{unread} unread notification{unread === 1 ? "" : "s"}.</p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="text-sm font-medium text-brand-500 hover:text-brand-600">
            Mark all as read
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You’re all caught up." />
      ) : (
        <div className="space-y-2">
          {items.map((n) => {
            const Icon = TYPE_ICON[n.type] || Bell;
            return (
              <Card key={n.id} className={`flex gap-4 p-4 ${!n.read ? "border-brand-500/30" : ""}`}>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${!n.read ? "bg-brand-500/10 text-brand-500" : "bg-raised text-faint"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className={`text-sm ${n.read ? "font-medium text-ink" : "font-semibold text-ink"}`}>{n.title}</p>
                    <span className="shrink-0 text-xs text-faint">{formatRelative(n.at)}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{n.body}</p>
                  {!n.read && (
                    <button onClick={() => markOne(n.id)} className="mt-2 text-xs font-medium text-brand-500 hover:text-brand-600">
                      Mark as read
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
