import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, BookOpen, User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const { cartCount, user, logout } = useStore();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/books", label: "Browse Books" },
    ...(user ? [{ to: "/orders", label: "My Orders" }] : []),
    ...(user?.role === "admin" ? [{ to: "/admin", label: "Admin" }] : []),
    { to: "/api-docs", label: "API Docs" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <BookOpen className="h-6 w-6" />
          <span>PageTurner</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.to) ? "text-primary" : "text-muted-foreground"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            {cartCount > 0 && (
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent p-0 text-[10px] text-accent-foreground">
                {cartCount}
              </Badge>
            )}
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              {user.role === "admin" && (
                <Link to="/admin">
                  <Button variant="ghost" size="icon"><LayoutDashboard className="h-4 w-4" /></Button>
                </Link>
              )}
              <span className="text-sm text-muted-foreground">{user.name}</span>
              <Button variant="ghost" size="icon" onClick={logout}><LogOut className="h-4 w-4" /></Button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block">
              <Button variant="outline" size="sm" className="gap-1">
                <User className="h-4 w-4" /> Sign In
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t bg-background p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${isActive(link.to) ? "bg-secondary text-primary" : "text-muted-foreground"}`}>
                {link.label}
              </Link>
            ))}
            {user ? (
              <button onClick={() => { logout(); setMobileOpen(false); }} className="rounded-md px-3 py-2 text-left text-sm text-destructive">
                Sign Out
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
