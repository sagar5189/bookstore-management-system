import { mockOrders } from "@/data/mockData";
import { useStore } from "@/context/StoreContext";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const statusColor: Record<string, string> = {
  pending: "bg-warning/20 text-warning-foreground border-warning/40",
  shipped: "bg-primary/10 text-primary border-primary/30",
  delivered: "bg-success/20 text-success border-success/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
};

const OrdersPage = () => {
  const { user } = useStore();

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <Package className="h-16 w-16 text-muted-foreground/40" />
        <h1 className="mt-4 font-display text-2xl font-bold">Sign in to view orders</h1>
        <Link to="/login"><Button className="mt-4">Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold">My Orders</h1>
      <p className="mt-1 text-muted-foreground">Track your order history</p>

      <div className="mt-8 space-y-4">
        {mockOrders.map(order => (
          <div key={order.id} className="rounded-lg border bg-card p-5 shadow-warm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="font-display text-sm font-semibold">{order.id}</span>
                <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
              <Badge variant="outline" className={statusColor[order.status]}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div className="mt-3 space-y-1">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.bookTitle} × {item.quantity}</span>
                  <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t pt-3">
              <span className="text-sm text-muted-foreground">Payment: {order.paymentStatus}</span>
              <span className="font-display text-lg font-bold text-primary">${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
