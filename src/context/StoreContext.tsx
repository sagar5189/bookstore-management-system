import React, { createContext, useContext, useState, useCallback } from "react";
import { CartItem, Book, User } from "@/types";
import { toast } from "sonner";

interface StoreContextType {
  cart: CartItem[];
  user: User | null;
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  login: (email: string, password: string, role?: "customer" | "admin") => void;
  register: (name: string, email: string, password: string, role: "customer" | "admin") => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const addToCart = useCallback((book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) {
        toast.success(`Updated quantity for "${book.title}"`);
        return prev.map(item => item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      toast.success(`Added "${book.title}" to cart`);
      return [...prev, { book, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((bookId: string) => {
    setCart(prev => prev.filter(item => item.book.id !== bookId));
    toast.info("Removed from cart");
  }, []);

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.book.id !== bookId));
      return;
    }
    setCart(prev => prev.map(item => item.book.id === bookId ? { ...item, quantity } : item));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const login = useCallback((email: string, _password: string, role: "customer" | "admin" = "customer") => {
    setUser({ id: "u1", name: email.split("@")[0], email, role });
    toast.success("Logged in successfully!");
  }, []);

  const register = useCallback((name: string, email: string, _password: string, role: "customer" | "admin") => {
    setUser({ id: "u-new", name, email, role });
    toast.success("Account created successfully!");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    toast.info("Logged out");
  }, []);

  return (
    <StoreContext.Provider value={{ cart, user, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, login, register, logout }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be within StoreProvider");
  return ctx;
};
