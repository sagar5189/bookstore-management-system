import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
            <BookOpen className="h-5 w-5" /> PageTurner
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Your favorite online bookstore. Discover, browse, and order books with ease.</p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/books" className="hover:text-primary">Browse Books</Link>
            <Link to="/login" className="hover:text-primary">Sign In</Link>
            <Link to="/register" className="hover:text-primary">Create Account</Link>
            <Link to="/api-docs" className="hover:text-primary">API Documentation</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold">Genres</h4>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {["Fiction", "Sci-Fi", "Fantasy", "Mystery", "Biography"].map(g => (
              <Link key={g} to={`/books?genre=${g}`} className="hover:text-primary">{g}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
        © 2026 PageTurner Bookstore. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
