import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, user } = useStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) { toast.error("Please sign in to place an order"); navigate("/login"); return; }
    toast.success("Order placed successfully! (Demo)");
    clearCart();
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
        <h1 className="mt-4 font-display text-2xl font-bold">Your Cart is Empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added any books yet.</p>
        <Link to="/books"><Button className="mt-4">Browse Books</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Shopping Cart</h1>
      <p className="mt-1 text-muted-foreground">{cart.length} item{cart.length !== 1 ? "s" : ""} in your cart</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,350px]">
        {/* Items */}
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.book.id} className="flex gap-4 rounded-lg border bg-card p-4">
              <img src={item.book.imageUrl} alt={item.book.title} className="h-24 w-16 rounded object-cover" />
              <div className="flex flex-1 flex-col">
                <Link to={`/books/${item.book.id}`} className="font-display font-semibold hover:text-primary">{item.book.title}</Link>
                <p className="text-sm text-muted-foreground">{item.book.authors.join(", ")}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.book.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.book.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-primary">${(item.book.price * item.quantity).toFixed(2)}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeFromCart(item.book.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="rounded-lg border bg-card p-6 shadow-warm lg:sticky lg:top-20 lg:self-start">
          <h3 className="font-display text-lg font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>Free</span></div>
            <div className="border-t pt-2 flex justify-between font-display text-lg font-bold">
              <span>Total</span><span className="text-primary">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <Button className="mt-6 w-full" size="lg" onClick={handleCheckout}>
            {user ? "Place Order" : "Sign In to Checkout"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
