import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/ui/Feedback";
import { useWishlist } from "@/state/wishlistStore";
import { PRODUCTS } from "@/data/products";

export default function Wishlist() {
  const { ids } = useWishlist();
  const products = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Wishlist</h1>
        <p className="mt-1 text-sm text-muted">Products you’ve saved for later.</p>
      </div>

      {products.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Tap the heart on any product to save it here."
          action={
            <Link to="/products" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
              Browse products
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
