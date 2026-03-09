import { Book } from "@/types";
import { useStore } from "@/context/StoreContext";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface BookCardProps {
  book: Book;
  index?: number;
}

const BookCard = ({ book, index = 0 }: BookCardProps) => {
  const { addToCart } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-warm transition-all duration-300 hover:shadow-[0_20px_50px_-12px_hsl(var(--primary)/0.25)] hover:border-primary/40 cursor-pointer"
    >
      <div className="pointer-events-none absolute inset-0 z-10 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      <Link to={`/books/${book.id}`} className="relative aspect-[2/3] overflow-hidden">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {book.stockQuantity < 10 && (
          <span className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
            Only {book.stockQuantity} left
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-300 group-hover:text-primary">{book.genre}</div>
        <Link to={`/books/${book.id}`}>
          <h3 className="font-display text-lg font-semibold leading-tight transition-colors duration-300 group-hover:text-primary">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{book.authors.join(", ")}</p>

        {book.rating && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 ${i < Math.floor(book.rating!) ? "fill-warning text-warning" : "text-border"}`} />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">{book.rating}</span>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-xl font-bold text-primary">${book.price.toFixed(2)}</span>
          <Button size="sm" onClick={() => addToCart(book)} className="gap-1 transition-transform duration-200 hover:scale-105">
            <ShoppingCart className="h-3.5 w-3.5" /> Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
