import { Link } from "react-router-dom";
import { Package, CreditCard, Truck, Heart, ShieldCheck, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Surfaces";
import { StatCard } from "@/components/StatCard";
import { StatusBadge, RiskBadge } from "@/components/ui/Badges";
import { EmptyState, Skeleton } from "@/components/ui/Feedback";
import { useAuth } from "@/state/AuthContext";
import { useWishlist } from "@/state/wishlistStore";
import { useAsync } from "@/hooks/useAsync";
import { listOrders, listTransactions } from "@/services/orderService";
import { formatCurrency, formatDate } from "@/lib/format";
import { CUSTOMER_NOTIFICATIONS } from "@/data/mock";

export default function Overview() {
  const { user } = useAuth();
  const { ids } = useWishlist();
  const { data: orders, loading } = useAsync(() => listOrders({ customerId: user?.id }), [user?.id]);
  const { data: txs } = useAsync(() => listTransactions({ customerId: user?.id }), [user?.id]);

  const totalSpent = (txs || [])
    .filter((t) => t.status === "successful")
    .reduce((s, t) => s + t.amount, 0);
  const inTransit = (orders || []).filter((o) =>
    ["processing", "confirmed", "shipped"].includes(o.orderStatus)
  ).length;
  const unread = CUSTOMER_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Welcome back, {user?.name?.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-muted">Here’s what’s happening with your account.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Orders" value={orders?.length ?? "—"} icon={Package} tone="brand" loading={loading} />
        <StatCard label="Total spent" value={formatCurrency(totalSpent)} icon={CreditCard} tone="success" />
        <StatCard label="In transit" value={inTransit} icon={Truck} tone="info" />
        <StatCard label="Saved items" value={ids.length} icon={Heart} tone="warning" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent orders */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">Recent orders</h2>
            <Link to="/account/orders" className="flex items-center gap-0.5 text-sm font-medium text-brand-500 hover:text-brand-600">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {loading
              ? [0, 1, 2].map((i) => <Skeleton key={i} className="h-16" />)
              : (orders || []).slice(0, 3).map((o) => (
                  <Link
                    key={o.id}
                    to={`/account/orders/${o.ref}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 transition hover:bg-raised"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{o.ref}</p>
                      <p className="text-xs text-muted">{formatDate(o.date)} · {o.items.length} item(s)</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden text-sm font-semibold text-ink sm:block">
                        {formatCurrency(o.total)}
                      </span>
                      <StatusBadge status={o.orderStatus} />
                    </div>
                  </Link>
                ))}
            {(orders || []).length === 0 && !loading && (
              <EmptyState title="No orders yet" description="Your orders will appear here." />
            )}
          </div>
        </Card>

        {/* Recent transactions */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">Recent transactions</h2>
            <Link to="/account/transactions" className="flex items-center gap-0.5 text-sm font-medium text-brand-500 hover:text-brand-600">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {(txs || []).slice(0, 3).map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{t.reference}</p>
                  <p className="text-xs text-muted">{formatDate(t.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-ink">{formatCurrency(t.amount)}</span>
                  <StatusBadge status={t.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Security + notifications */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex items-start gap-4 p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-ink">Account security</h3>
            <p className="mt-1 text-sm text-muted">
              Your account is protected. Review active sessions and login activity.
            </p>
            <Link to="/account/security" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600">
              Manage security <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-ink">Notifications</h3>
            <Link to="/account/notifications" className="text-sm font-medium text-brand-500 hover:text-brand-600">
              {unread} unread
            </Link>
          </div>
          <ul className="mt-3 space-y-2">
            {CUSTOMER_NOTIFICATIONS.slice(0, 3).map((n) => (
              <li key={n.id} className="flex items-start gap-2 text-sm">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.read ? "bg-faint" : "bg-brand-500"}`} />
                <span className="text-ink">{n.title}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
