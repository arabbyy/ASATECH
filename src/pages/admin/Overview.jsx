import { Link } from "react-router-dom";
import {
  Banknote,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  Boxes,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/Surfaces";
import { StatCard } from "@/components/StatCard";
import { RiskBadge } from "@/components/ui/Badges";
import { LineChart, BarChart, DonutChart } from "@/components/charts";
import { useAsync } from "@/hooks/useAsync";
import { getAnalytics } from "@/services/adminService";
import { ORDERS, TRANSACTIONS, FRAUD_ALERTS } from "@/data/mock";
import { PRODUCTS } from "@/data/products";
import { formatCurrency, formatNumber } from "@/lib/format";

export default function AdminOverview() {
  const { data: analytics } = useAsync(() => getAnalytics(), []);

  const revenue = TRANSACTIONS.filter((t) => t.status === "successful").reduce((s, t) => s + t.amount, 0);
  const successful = TRANSACTIONS.filter((t) => t.status === "successful").length;
  const failed = TRANSACTIONS.filter((t) => t.status === "failed").length;
  const pendingOrders = ORDERS.filter((o) => o.orderStatus === "pending").length;
  const suspicious = TRANSACTIONS.filter((t) => t.riskLevel === "high").length;
  const lowStock = PRODUCTS.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const outStock = PRODUCTS.filter((p) => p.stock <= 0).length;
  const openAlerts = FRAUD_ALERTS.filter((a) => a.status === "new").length;

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Operational overview of sales, payments and risk.</p>
        </div>
        <div className="flex items-center gap-2">
          {openAlerts > 0 && (
            <Link to="/admin/fraud-alerts" className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-500">
              <ShieldAlert className="h-4 w-4" /> {openAlerts} open alert{openAlerts > 1 ? "s" : ""}
            </Link>
          )}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Revenue" value={formatCurrency(revenue)} icon={Banknote} tone="brand" hint="Successful payments" />
        <StatCard label="Transactions" value={formatNumber(TRANSACTIONS.length)} icon={CreditCard} tone="info" />
        <StatCard label="Successful" value={formatNumber(successful)} icon={CheckCircle2} tone="success" />
        <StatCard label="Failed" value={formatNumber(failed)} icon={XCircle} tone="danger" />
        <StatCard label="Pending orders" value={pendingOrders} icon={Clock} tone="warning" />
        <StatCard label="Suspicious" value={suspicious} icon={ShieldAlert} tone="danger" hint="High-risk transactions" />
        <StatCard label="Low stock" value={lowStock} icon={Boxes} tone="warning" />
        <StatCard label="Out of stock" value={outStock} icon={Boxes} tone="danger" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">Revenue</h2>
            <span className="text-xs text-faint">₦ millions</span>
          </div>
          <div className="mt-4">
            <LineChart data={analytics?.revenueSeries || []} />
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink">Transactions</h2>
            <span className="text-xs text-faint">per month</span>
          </div>
          <div className="mt-4">
            <BarChart data={analytics?.transactionsSeries || []} />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-base font-semibold text-ink">Risk distribution</h2>
          <div className="mt-4 flex justify-center">
            <DonutChart
              data={analytics?.riskDistribution || []}
              centerValue={`${suspicious}%`}
              centerLabel="High risk"
            />
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="text-base font-semibold text-ink">Sales by category</h2>
          <div className="mt-4">
            <BarChart data={analytics?.categorySales || []} color="#0ea5e9" />
          </div>
        </Card>
      </div>

      {/* Recent alerts */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink">Recent fraud alerts</h2>
          <Link to="/admin/fraud-alerts" className="flex items-center gap-0.5 text-sm font-medium text-brand-500 hover:text-brand-600">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 space-y-2">
          {FRAUD_ALERTS.slice(0, 4).map((a) => (
            <Link
              key={a.id}
              to={`/admin/fraud-alerts/${a.id}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3 transition hover:bg-raised"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{a.customerName}</p>
                <p className="text-xs text-muted">{a.txnRef} · {formatCurrency(a.amount)}</p>
              </div>
              <RiskBadge level={a.severity} score={a.riskScore} />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
